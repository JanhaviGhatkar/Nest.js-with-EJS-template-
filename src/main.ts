import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useStaticAssets(join(__dirname, "../../", 'public'));
  console.log(join(__dirname, "../../", 'public'));
  
  // console.log("path:");
  // console.log(__dirname);
  // console.log(join(__dirname, '..', 'views'));
  app.setBaseViewsDir(join(__dirname, "../../", "views"));

  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
