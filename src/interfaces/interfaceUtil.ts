export interface ImageResult {
	image: string | ArrayBuffer;
	details: {
		language: string;
		symbol: string;
		description: string;
	}
}

export interface VideoResult {
	language: {
		name: string;
		confidence: string;
	};
	signs: Array<{
		gloss: string;
		translation: string;
	}>;
	description: string;
}

export interface History {
	chat: string,
	details: ImageResult["details"]
}

export interface VideoHistory {
	chat: string,
	details: VideoResult
}