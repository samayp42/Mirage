
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AppState, Style, Category, Gender } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import StyleSelectionScreen from './components/StyleSelectionScreen';
import CaptureScreen from './components/CaptureScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import DownloadScreen from './components/QrCodeScreen';
import ApiKeyScreen from './components/ApiKeyScreen';
import GalleryScreen from './components/GalleryScreen';
import IdleScreen from './components/IdleScreen';
import { ADULT_STYLES, KID_STYLES, COUPLE_STYLES, buildDynamicPrompt } from './constants';
import { saveToGallery, incrementGenerationCount } from './services/db';

const IDLE_TIMEOUT_MS = 60000; // 60 Seconds

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('idle'); // Start in Idle
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
    const [selectedGender, setSelectedGender] = useState<Gender>('female');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [finalPrompt, setFinalPrompt] = useState<string>('');

    // Idle Timer Logic
    const idleTimerRef = useRef<number | null>(null);

    const resetIdleTimer = useCallback(() => {
        if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
        
        // Only set idle timer if NOT in certain states (like capturing or generating) to prevent interruption
        if (appState !== 'generating' && appState !== 'capture' && appState !== 'idle') {
            idleTimerRef.current = window.setTimeout(() => {
                handleStartOver(); // Reset data
                setAppState('idle');
            }, IDLE_TIMEOUT_MS);
        }
    }, [appState]);

    useEffect(() => {
        // Global event listeners to detect activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        const handleActivity = () => resetIdleTimer();

        events.forEach(event => window.addEventListener(event, handleActivity));
        
        // Initial start
        resetIdleTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, handleActivity));
            if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
        };
    }, [resetIdleTimer]);


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
            const prompt = buildDynamicPrompt(selectedStyle.id, selectedGender, selectedStyle.prompt);
            setFinalPrompt(prompt);
        }
        setAppState('generating');
    }, [selectedStyle, selectedGender]);
    
    const handleGenerationComplete = useCallback(async (imageDataUrl: string) => {
        setGeneratedImage(imageDataUrl);
        setError(null);
        incrementGenerationCount();
        if (selectedStyle) {
            await saveToGallery(imageDataUrl, selectedStyle.name, finalPrompt);
        }
        setAppState('result');
    }, [selectedStyle, finalPrompt]);

    const handleGenerationError = useCallback((errorMessage: string) => {
        console.error("App Error:", errorMessage);
        if (
            errorMessage.includes("Requested entity was not found") || 
            errorMessage.includes("PERMISSION_DENIED") || 
            errorMessage.includes("403") ||
            errorMessage.includes("429") || 
            errorMessage.includes("quota") || 
            errorMessage.includes("exhausted") ||
            errorMessage.includes("Too Many Requests")
        ) {
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

    const handleGoIdle = useCallback(() => {
        setCapturedImage(null);
        setGeneratedImage(null);
        setError(null);
        setFinalPrompt('');
        setSelectedCategory(null);
        setSelectedStyle(null);
        setAppState('idle');
    }, []);

    const handleOpenGallery = useCallback(() => {
        setAppState('gallery');
    }, []);

    const handleExitIdle = useCallback(() => {
        setAppState('welcome');
    }, []);

    const renderScreen = () => {
        switch (appState) {
            case 'idle':
                return <IdleScreen onStart={handleExitIdle} />;
            case 'api_key_selection':
                return <ApiKeyScreen onSelectKey={handleApiKeySelection} />;
            case 'welcome':
                return <WelcomeScreen onCategorySelect={handleCategorySelect} onOpenGallery={handleOpenGallery} onGoIdle={handleGoIdle} />;
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
                return <WelcomeScreen onCategorySelect={handleCategorySelect} onOpenGallery={handleOpenGallery} onGoIdle={handleGoIdle} />;
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
