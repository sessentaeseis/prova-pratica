## 1. Iniciando
a) Baixe o repositório github.  
b) Após isso, abra o repositório em uma IDE. Com a folder aberta, abra o console e digite "npm install".  
c) Crie um arquivo .env na raiz do projeto e configure a URL de conexão com o banco de dados nele.  
d) Para criar/aplicar as migrations do banco de dados, execute: "npx prisma migrate dev". Caso seja necessário gerar o Prisma Client: "npx prisma generate"  
e) Para rodar o servidor, digite no console "npm run dev".  

## 2. Testes
a) Para testar as requisições, utilize um software como Postman ou Thunder Client.   
b) As requisições válidas são:  
- GET equipes  
- GET equipes/:id/desenvolvedores  
- POST desenvolvedores  
- POST equipes  
- PUT desenvolvedores/:id  
- PUT equipes/:id  
- DELETE desenvolvedores/:id  
- DELETE equipes/:id  
c) O servidor, por padrão, roda na porta 3000. Portanto, utilize a url "http://localhost:3000/" para as requisições.
