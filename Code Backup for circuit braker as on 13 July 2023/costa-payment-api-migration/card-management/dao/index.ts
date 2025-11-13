import { PrismaClient as CardDbClient } from '@prisma/client';
// import { PrismaClient as CardDbClient } from '@internal/prisma-card/client';

export class PaymentRepository{
  public readonly cardDbClient: CardDbClient;
  constructor() {
    this.cardDbClient = new CardDbClient();
  }
  create(){

  }
  
  update(){

  }

  delete(){

  }

  async getCompany(): Promise<any>{
    try{
      this.cardDbClient.$connect();
      const allCompany = await this.cardDbClient.employee.findMany();
      console.log(allCompany);
    }catch(e){
      throw e
    }finally{
      await this.cardDbClient.$disconnect();
    }
  }

  async getUser(): Promise<any>{
    try{
      this.cardDbClient.$connect();
      const allUsers = await this.cardDbClient.user.findMany();
      console.log(allUsers);
    }catch(e){
      throw e
    }finally{
      await this.cardDbClient.$disconnect();
    }
  }
}