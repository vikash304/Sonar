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
      //const rawSQL  =`CALL GetSequenceBlock('${sequenceName}', ${addCount}, @start, @end);`
      const result1 = await this.cardDbClient.$executeRaw`call GetAllCards()`;
      const result2 = await this.cardDbClient.$queryRaw`select * from t_pgw_card_details limit 1`;
      console.log(result2);
      //const allCompany = await this.cardDbClient.t_pgw_card_details.findFirst();
      // console.log(allCompany);
    }catch(e){
      throw e
    }finally{
      await this.cardDbClient.$disconnect();
    }
  }

  // async getUser(): Promise<any>{
  //   try{
  //     this.cardDbClient.$connect();
  //     const allUsers = await this.cardDbClient.user.findMany();
  //     console.log(allUsers);
  //   }catch(e){
  //     throw e
  //   }finally{
  //     await this.cardDbClient.$disconnect();
  //   }
  // }
}