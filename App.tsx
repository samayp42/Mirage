
import React, { useState, useCallback } from 'react';
import { AppState, Style, Category, Gender } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import StyleSelectionScreen from './components/StyleSelectionScreen';
import CaptureScreen from './components/CaptureScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import DownloadScreen from './components/QrCodeScreen';
import ApiKeyScreen from './components/ApiKeyScreen';
import GalleryScreen from './components/GalleryScreen';
import { ADULT_STYLES, KID_STYLES, COUPLE_STYLES, buildDynamicPrompt } from './constants';
import { saveToGallery, incrementGenerationCount } from './services/db';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('welcome');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
    const [selectedGender, setSelectedGender] = useState<Gender>('female'); // Lifted state
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [finalPrompt, setFinalPrompt] = useState<string>('');

    const handleApiKeySelection = useCallback(async () => {
        const aistudio = (window as any).aistudio;
        if (aistudio && aistudio.openSelectKey) {
            try {
                await aistudio.openSelectKey();
                setAppState('welcome');
            } catch (e) {
                console.error("Failed to select key", e);
            }
        }
    }, []);

    const handleCategorySelect = useCallback((category: Category) => {
        setSelectedCategory(category);
        setAppState('style_select');
    }, []);

    const handleStyleSelect = useCallback((style: Style, gender?: Gender) => {
        setSelectedStyle(style);
        if (gender) {
            setSelectedGender(gender);
        }
        setAppState('capture');
    }, []);

    const handlePhotoCapture = useCallback((imageDataUrl: string) => {
        setCapturedImage(imageDataUrl);
        if (selectedStyle) {
            // Use the selectedGender from state
            const prompt = buildDynamicPrompt(selectedStyle.id, selectedGender, selectedStyle.prompt);
            setFinalPrompt(prompt);
        }
        setAppState('generating');
    }, [selectedStyle, selectedGender]);
    
    const handleGenerationComplete = useCallback(async (imageDataUrl: string) => {
        setGeneratedImage(imageDataUrl);
        setError(null);
        
        // Update Stats
        incrementGenerationCount();

        // AUTO SAVE TO DATABASE
        if (selectedStyle) {
            await saveToGallery(imageDataUrl, selectedStyle.name, finalPrompt);
        }

        setAppState('result');
    }, [selectedStyle, finalPrompt]);

    const handleGenerationError = useCallback((errorMessage: string) => {
        console.error("App Error:", errorMessage);
        
        // CHECK FOR FALLBACK CONDITIONS (Quota, Permissions, 429s)
        if (
            errorMessage.includes("Requested entity was not found") || 
            errorMessage.includes("PERMISSION_DENIED") || 
            errorMessage.includes("403") ||
            errorMessage.includes("429") || 
            errorMessage.includes("quota") || 
            errorMessage.includes("exhausted") ||
            errorMessage.includes("Too Many Requests")
        ) {
             // Fallback to API Key Selection to let user switch keys
             setAppState('api_key_selection');
             return;
        }
        
        setError(errorMessage);
        setAppState('capture');
    }, []);

    const handleRetake = useCallback(() => {
        setCapturedImage(null);
        setGeneratedImage(null);
        setError(null);
        setAppState('capture');
    }, []);

    const handleTryAnotherStyle = useCallback(() => {
        setGeneratedImage(null);
        setAppState('style_select');
    }, []);

    const handleShowDownload = useCallback(() => {
        setAppState('download');
    }, []);

    const handleBackToResult = useCallback(() => {
        setAppState('result');
    }, []);

    const handleBackToStyleSelect = useCallback(() => {
        setError(null);
        setAppState('style_select');
    }, []);
    
    const handleStartOver = useCallback(() => {
        setAppState('welcome');
        setSelectedCategory(null);
        setSelectedStyle(null);
        setCapturedImage(null);
        setGeneratedImage(null);
        setError(null);
        setFinalPrompt('');
    }, []);

    const handleOpenGallery = useCallback(() => {
        setAppState('gallery');
    }, []);

    const renderScreen = () => {
        switch (appState) {
            case 'api_key_selection':
                return <ApiKeyScreen onSelectKey={handleApiKeySelection} />;
            case 'welcome':
                return <WelcomeScreen onCategorySelect={handleCategorySelect} onOpenGallery={handleOpenGallery} />;
            case 'gallery':
                return <GalleryScreen onBack={handleStartOver} />;
            case 'style_select':
                let styles = ADULT_STYLES;
                if (selectedCategory === 'child') styles = KID_STYLES;
                if (selectedCategory === 'couple') styles = COUPLE_STYLES;
                return <StyleSelectionScreen 
                    styles={styles} 
                    onStyleSelect={handleStyleSelect} 
                    onBack={handleStartOver} 
                    category={selectedCategory}
                />;
            case 'capture':
                return <CaptureScreen 
                    onCapture={handlePhotoCapture} 
                    styleName={selectedStyle?.name || ''} 
                    error={error} 
                    onBack={handleBackToStyleSelect}
                    category={selectedCategory}
                    selectedGender={selectedGender}
                />;
            case 'generating':
                if (!capturedImage || !selectedStyle) {
                    handleStartOver();
                    return null;
                }
                return <LoadingScreen capturedImage={capturedImage} style={{...selectedStyle, prompt: finalPrompt}} onComplete={handleGenerationComplete} onError={handleGenerationError} />;
            case 'result':
                if (!generatedImage || !selectedStyle) {
                    handleStartOver();
                    return null;
                }
                return <ResultScreen generatedImage={generatedImage} styleName={selectedStyle.name} onRetake={handleRetake} onTryAnotherStyle={handleTryAnotherStyle} onShowDownload={handleShowDownload} onStartOver={handleStartOver} />;
            case 'download':
                 if (!generatedImage) {
                    handleStartOver();
                    return null;
                }
                return <DownloadScreen imageDataUrl={generatedImage} onBack={handleBackToResult} />
            default:
                return <WelcomeScreen onCategorySelect={handleCategorySelect} onOpenGallery={handleOpenGallery} />;
        }
    };

    return (
        <main className="w-full h-screen relative overflow-hidden bg-[#050505] text-white">
            <div className="relative z-10 w-full h-full flex flex-col">
                {renderScreen()}
            </div>
        </main>
    );
};

export default App;
