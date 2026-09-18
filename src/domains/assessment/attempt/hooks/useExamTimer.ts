import {
  useEffect,
  useMemo,
  useState,
} from 'react';

interface UseExamTimerProps {
  startedAt: string | null;
  durationMinutes: number;
}

interface UseExamTimerResult {
  remainingSeconds: number;
  isExpired: boolean;
  formattedTime: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useExamTimer({
  startedAt,
  durationMinutes,
}: UseExamTimerProps): UseExamTimerResult {
  // ========================================
  // DEADLINE
  // ========================================

  const deadline = useMemo(() => {
    if (!startedAt) {
      return null;
    }

    const startedTime =
      new Date(startedAt).getTime();

    return (
      startedTime +
      durationMinutes * 60 * 1000
    );
  }, [
    startedAt,
    durationMinutes,
  ]);

  // ========================================
  // REMAINING SECONDS
  // ========================================

  const calculateRemainingSeconds =
    () => {
      if (deadline === null) {
        return 0;
      }

      const now =
        Date.now();

      const difference =
        deadline - now;

      if (difference <= 0) {
        return 0;
      }

      return Math.ceil(
        difference / 1000
      );
    };

  const [
    remainingSeconds,
    setRemainingSeconds,
  ] = useState(
    calculateRemainingSeconds
  );

  // ========================================
  // COUNTDOWN
  // ========================================

  useEffect(() => {
    /*
     * Reset timer ketika
     * startedAt atau duration berubah.
     */
    setRemainingSeconds(
      calculateRemainingSeconds()
    );

    if (deadline === null) {
      return;
    }

    const interval =
      window.setInterval(() => {
        const remaining =
          calculateRemainingSeconds();

        setRemainingSeconds(
          remaining
        );

        if (remaining <= 0) {
          window.clearInterval(
            interval
          );
        }
      }, 1000);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [
    deadline,
    startedAt,
    durationMinutes,
  ]);

  // ========================================
  // TIME CALCULATION
  // ========================================

  const hours =
    Math.floor(
      remainingSeconds / 3600
    );

  const minutes =
    Math.floor(
      (remainingSeconds % 3600) /
        60
    );

  const seconds =
    remainingSeconds % 60;

  // ========================================
  // FORMATTED TIME
  // ========================================

  const formattedTime =
    [
      hours,
      minutes,
      seconds,
    ]
      .map((value) =>
        String(value).padStart(
          2,
          '0'
        )
      )
      .join(':');

  // ========================================
  // EXPIRED
  // ========================================

  const isExpired =
    deadline !== null &&
    remainingSeconds <= 0;

  // ========================================
  // RETURN
  // ========================================

  return {
    remainingSeconds,
    isExpired,
    formattedTime,
    hours,
    minutes,
    seconds,
  };
}