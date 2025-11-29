
// ============================================================================
// Local Persistence Layer (IndexedDB)
// ============================================================================

const DB_NAME = 'MirageStudioDB';
const STORE_NAME = 'gallery';
const DB_VERSION = 1;

export interface GalleryItem {
  id: string;
  timestamp: number;
  dataUrl: string; // Base64 image
  styleName: string;
  prompt: string;
}

// Open Database Connection
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Auto-Save Image
export const saveToGallery = async (dataUrl: string, styleName: string, prompt: string): Promise<void> => {
  try {
    const db = await openDB();
    const item: GalleryItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      dataUrl,
      styleName,
      prompt
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(item);

      request.onsuccess = () => {
        console.log("Image auto-saved to local database.");
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("Failed to save to DB:", err);
  }
};

// Retrieve All Images
export const getGallery = async (): Promise<GalleryItem[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const results = request.result as GalleryItem[];
      // Sort newest first
      resolve(results.sort((a, b) => b.timestamp - a.timestamp));
    };
    request.onerror = () => reject(request.error);
  });
};

// Delete Image
export const deleteFromGallery = async (id: string): Promise<void> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// ============================================================================
// Global Stats (LocalStorage)
// ============================================================================

export const getGenerationCount = (): number => {
    try {
        const count = localStorage.getItem('mirage_gen_count');
        return count ? parseInt(count, 10) : 0;
    } catch {
        return 0;
    }
};

export const incrementGenerationCount = (): number => {
    try {
        const current = getGenerationCount();
        const next = current + 1;
        localStorage.setItem('mirage_gen_count', next.toString());
        return next;
    } catch {
        return 0;
    }
};
