import { useState, useRef, useEffect } from 'react';

interface AudioRecoderControls{
    isReacording: boolean;
    recordingBlob: Blob | null;
    recodringUrl : string | null;
    recordingTime: number;
    startRecording:() => Promise<void>;
    stopRecording:() => void;
    resetRecording: () => void;
    getMicrophonePermission: () => Promise<void>;
    permissionGranted: boolean;
    error: string | null;
}