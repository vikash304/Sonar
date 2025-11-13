export class CircuitStateConfig {
    static circuitState = '';
    static failureCount = 0;
    static successCount = 0;
    static nextAttempt  = Date.now();
}