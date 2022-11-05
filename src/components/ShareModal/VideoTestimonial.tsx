import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder'
import clx from 'classnames'
import s from './VideoTestimonial.module.css'
import { AiOutlineLoading } from 'react-icons/ai'
import { Spinner } from '@components/Spinner';

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return <video className='rounded-xl' ref={videoRef} width={500} height={500} autoPlay controls={false} />;
};


interface Props {
  status: string,
  startRecording: () => void;
  stopRecording: () => void;
  clearBlobUrl: () => void;
  previewStream: MediaStream | null;
  mediaBlobUrl: string | undefined;
}
const VideoTestimonial = ({
  status,
  startRecording,
  stopRecording,
  clearBlobUrl,
  previewStream,
  mediaBlobUrl
}: Props) => {
  const [recording, setRecording] = useState<Boolean>(false)
  const [finished, setFinished] = useState<Boolean>(false)
  const [permissionState, setPermission] = useState<'granted' | 'denied' | 'prompted' | null>(null)

  useEffect(() => {
    navigator.permissions.query({ name: "camera" as any }).then(res => {
      console.log({ permission: res })
      setPermission(res.state as any)
    });

  })

  useEffect(() => {
    startRecording();
    return () => clearBlobUrl();
  }, [])

  const handleStart = useCallback(() => {
    clearBlobUrl();
    startRecording();
    setRecording(true)
  }, [])

  const handleStop = useCallback(() => {
    stopRecording()
    setRecording(false)
    setFinished(true);
  }, [])

  const handleRetake = useCallback(() => {
    clearBlobUrl()
    setRecording(false)
    setFinished(false);
    startRecording();
  }, [])

  if (permissionState === 'prompted') {
    return (
      <div className="p-3 border rounded-xl h-[300px] flex justify-center items-center">
        <AiOutlineLoading className={clx(s.loading, 'h-8 w-8')} />
      </div>
    )
  }

  if (permissionState === 'denied') {
    return (
      <div className="p-3 border rounded-xl">
        <h2 className="text-primary">Looks like we don't have permissions to capture video</h2>
        <span className="text-accent-4 text-sm">Please allow video capture permissions in your browser</span>
      </div>
    )
  }

  return (
    <div>
      {!finished && previewStream && <VideoPreview stream={previewStream} />}
      {finished && <video className='rounded-xl' src={mediaBlobUrl} width={500} height={500} controls />}
      <div className='mt-2 flex gap-2'>
        {!recording && <button className={clx(s.button, 'w-full')} onClick={handleStart}>Start Recording</button>}
        {recording && <button className={clx(s.button, 'w-full')} onClick={handleStop}>Stop Recording</button>}
        {finished && <button className={clx(s.button, s.retake, 'w-1/3')} onClick={handleRetake}>Retake</button>}
      </div>
    </div>
  );
};

export default VideoTestimonial
