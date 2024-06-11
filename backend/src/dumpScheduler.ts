import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import * as cron from 'node-cron';

dotenv.config();

console.log('entrou no dump')

const generateDump = () => {
  const dumpFile = `${process.env.BACKUP_DIR}/${process.env.FILE_NAME}`;
//   const pgDumpPath = '/path/to/postgresql/bin/pg_dump'; C:\Program Files\PostgreSQL\16\bin
  const command = `pg_dump -U ${process.env.POSTGRES_USER} -h ${process.env.POSTGRES_HOST} -d ${process.env.POSTGRES_DATABASE} -F c -b -v -f ${dumpFile}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao gerar dump: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`pg_dump stderr: ${stderr}`);
      return;
    }
    console.log(`Dump do banco de dados gerado com sucesso: ${stdout}`);
  });
};

// Agendar tarefa para executar a cada 10 minutos
cron.schedule('*/10 * * * *', () => {
  console.log('Executando tarefa de dump do banco de dados...');
  generateDump();
});

// Executa o dump imediatamente na inicialização
generateDump();
