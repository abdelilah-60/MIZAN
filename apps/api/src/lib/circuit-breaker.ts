interface CircuitBreakerConfig {
  failureThreshold: number;
  cooldownMs: number;
}

interface CircuitState {
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failures: number;
}

export class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: CircuitState['state'] = 'CLOSED';
  private config: CircuitBreakerConfig;

  constructor(config?: Partial<CircuitBreakerConfig>) {
    this.config = {
      failureThreshold: 3,
      cooldownMs: 30000,
      ...config
    };
  }

  async call<T>(fn: () => Promise<T>, fallback: () => T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime >= this.config.cooldownMs) {
        this.state = 'HALF_OPEN';
      } else {
        return fallback();
      }
    }

    try {
      const result = await fn();
      this.failures = 0;
      this.state = 'CLOSED';
      return result;
    } catch {
      this.failures++;
      this.lastFailureTime = Date.now();
      if (this.failures >= this.config.failureThreshold) {
        this.state = 'OPEN';
      }
      return fallback();
    }
  }

  get stateInfo(): CircuitState {
    return { state: this.state, failures: this.failures };
  }

  reset(): void {
    this.failures = 0;
    this.lastFailureTime = 0;
    this.state = 'CLOSED';
  }
}
