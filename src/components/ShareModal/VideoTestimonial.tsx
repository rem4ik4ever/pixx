import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clx from 'classnames'
import s from './VideoTestimonial.module.css'
import { AiOutlineLoading } from 'react-icons/ai'
import { StopIcon, PlayIcon, VideoCameraIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import Button from '@components/ui/Button';

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

const useTimer = (limit?: number, limitCallback?: () => void) => {
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState<Boolean>(false)
  useEffect(() => {
    let timer: any = null
    if (started) {
      timer = setInterval(() => {
        if (limit && seconds + 1 > limit) {
          limitCallback?.();
          setStarted(false)
        } else {
          setSeconds(seconds + 1)
        }
      }, 1000)
    } else if (timer) {
      clearInterval(timer)
    }
    return () => timer && clearTimeout(timer)
  }, [started, seconds])

  const start = useCallback(() => {
    if (!started) {
      setStarted(true)
    }
  }, [started])

  const stop = useCallback(() => {
    setStarted(false)
  }, [])

  const reset = useCallback(() => {
    setSeconds(0)
    setStarted(false)
  }, [])

  return {
    start,
    stop,
    reset,
    seconds,
  }
}

const VideoTestimonial = ({
  status,
  startRecording,
  stopRecording,
  clearBlobUrl,
  previewStream,
  mediaBlobUrl,
}: Props) => {
  const [recording, setRecording] = useState<Boolean>(false)
  const [finished, setFinished] = useState<Boolean>(false)
  const [permissionState, setPermission] = useState<'granted' | 'denied' | 'prompted' | null>(null)
  const finishRecording = () => {
    stopRecording()
    setRecording(false)
    setFinished(true);
  }
  const { seconds, start, stop, reset } = useTimer(180, finishRecording)

  useEffect(() => {
    try {
      navigator.permissions.query({ name: "camera" as any }).then(res => {
        setPermission(res.state as any)
      });
    } catch (error) {
      setPermission('granted')
    }
  })

  useEffect(() => {
    startRecording();
    return () => clearBlobUrl();
  }, [])

  const handleStart = useCallback(() => {
    start()
    clearBlobUrl();
    startRecording();
    setRecording(true)
  }, [])

  const handleStop = useCallback(() => {
    stop()
    finishRecording()
  }, [])

  const handleRetake = useCallback(() => {
    reset()
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
        <h2 className="text-primary">Looks like we don&apos;t have permissions to capture video</h2>
        <span className="text-accent-4 text-sm">Please allow video capture permissions in your browser</span>
      </div>
    )
  }

  return (
    <div>
      {!finished && previewStream && <VideoPreview stream={previewStream} />}
      {finished && <video className='rounded-xl' src={mediaBlobUrl} width={500} height={500} controls />}
      <div>
        {seconds} s.
      </div>
      <div className='mt-2 flex gap-2'>
        {!recording && !finished && <Button className={clx(s.button, 'w-full')} onClick={handleStart}>
          <VideoCameraIcon className={s.icon} />
          <span>Start</span>
        </Button>}
        {recording && <Button className={clx(s.button, 'w-full')} onClick={handleStop}>
          <StopIcon className={s.icon} /> stop
        </Button>}

        {finished && <Button className={clx(s.button, 'w-full')} onClick={handleRetake}>
          Submit
        </Button>}

        {finished && <Button className={clx(s.button, s.retake, 'w-1/3')} onClick={handleRetake}>
          <ArrowPathIcon className={s.icon} /> retake
        </Button>}
      </div>
    </div >
  );
};

export default VideoTestimonial
