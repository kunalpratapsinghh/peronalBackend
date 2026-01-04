import bunyan from 'bunyan';

const logger = bunyan.createLogger({ 
  name: 'app',    
  level: 'info'
});

export default logger;
