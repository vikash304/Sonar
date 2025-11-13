import { CircuitStateConfig } from './circuit-state'

export class CircuitBreaker{
    public state: string = 'CLOSED';
    public failureCount: number = 0;
    public failureThreshold: number = 5;
    public successCount: number = 0;
    public successThreshold: number = 2;
    public timeout: number = 10000;
    public nextAttempt: any = Date.now();
    public request: any;
    public fallback: any = null;
    

    constructor(request:any, options: any){
        this.request = request;
        this.fallback = options.fallback;
        this.failureThreshold = options.failureThreshold;
        this.successThreshold = options.successThreshold;
        this.timeout = options.timeout;
        console.log('after constuctor ' , this);
    }

    
    async fire () {
        const data = await this.getState();
        console.log('insde fire  ' , data);
        const itemData = data
        if (itemData !== undefined) {
          this.state = itemData.circuitState
          this.failureCount = itemData.failureCount
          this.successCount = itemData.successCount
          this.nextAttempt = itemData.nextAttempt
        }
        if (this.state === 'OPEN') {
          if (this.nextAttempt <= Date.now()) {
            this.half()
          } else {
            if (this.fallback) {
              return this.tryFallback()
            }
            throw new Error('CircuitBreaker state: OPEN')
          }
        }
        try {
          const response = await this.request()
          return this.success(response)
        } catch (err) {
          return this.fail(err)
        }
      }
    async success (response: any) {
        if (this.state === 'HALF') {
          this.successCount++
          if (this.successCount > this.successThreshold) {
            this.close()
          }
        }
        this.failureCount = 0
        await this.updateState('Success')
        return response
      }  
    async fail (err: any) {
        this.failureCount++
        if (this.failureCount >= this.failureThreshold) {
          this.open()
        }
        await this.updateState('Failure')
        if (this.fallback) return this.tryFallback()
        return err
      } 
      open () {
        console.log('CircuitBreaker state: OPEN')
        this.state = 'OPEN'
        this.nextAttempt = Date.now() + this.timeout
      }
      close () {
        console.log('CircuitBreaker state: CLOSED')
        this.successCount = 0
        this.failureCount = 0
        this.state = 'CLOSED'
      }
      half () {
        console.log('CircuitBreaker state: HALF')
        this.state = 'HALF'
      }
      
      async tryFallback () {
        console.log('CircuitBreaker Fallback request')
        try {
          const response = await this.fallback()
          return response
        } catch (err) {
          return err
        }
      }
    async getState () {
        try {
        //   const ddbParams = {
        //     TableName: circuitBreakerTable,
        //     Key: {
        //       id: lambdaFunctionName
        //     }
        //   }
        //   const data = await dynamoDb.get(ddbParams).promise()
        const data = {
            circuitState : CircuitStateConfig.circuitState,
            failureCount : CircuitStateConfig.failureCount,
            successCount : CircuitStateConfig.successCount,
            nextAttempt : CircuitStateConfig.nextAttempt
        }
    
          return data
        } catch (err) {
          console.error(err)
          throw err
        }
      } 
      
      async updateState (action: string) {
        try {
        //   const ddbParams = {
        //     TableName: circuitBreakerTable,
        //     Key: {
        //       id: lambdaFunctionName
        //     },
        //     UpdateExpression:
        //       'set circuitState=:st, failureCount=:fc, successCount=:sc, nextAttempt=:na, stateTimestamp=:ts',
        //     ExpressionAttributeValues: {
        //       ':st': this.state,
        //       ':fc': this.failureCount,
        //       ':sc': this.successCount,
        //       ':na': this.nextAttempt,
        //       ':ts': Date.now()
        //     },
        //     ReturnValues: 'UPDATED_NEW'
        //   }
        //   const data = await dynamoDb.update(ddbParams).promise()
        
            CircuitStateConfig.circuitState = this.state;
            CircuitStateConfig.failureCount = this.failureCount;
            CircuitStateConfig.successCount = this.successCount;
            CircuitStateConfig.nextAttempt = this.nextAttempt;
            console.log('inside updateState' , CircuitStateConfig);
          return CircuitStateConfig;
        } catch (err) {
          console.log(err)
          return err
        }
      }
}


