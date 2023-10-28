let hostConfig = {};
switch (process.env.NODE_ENV) {
   case 'production':
      hostConfig = {
         PROTOCOL: 'https',
         HOST: 'www.dinshaws.co.in',
         PORT: '',
         FEEDBACK_EMAIL: 'customerdelight@dinshaws.co.in',
         CAREER_EMAIL: 'corporatehr@dinshaws.co.in, personnel@dinshaws.co.in',
         REPLY_TO: 'corporatehr@dinshaws.co.in',
      };
      break;
   case 'test':
      hostConfig = {
         PROTOCOL: 'http',
         HOST: 'dinshaws.org',
         PORT: process.env.PORT || 4000,
         FEEDBACK_EMAIL: 'nitinbetharia@dinshaws.co.in , itsupport06@dinshaws.co.in',
         CAREER_EMAIL: 'nitinbetharia@dinshaws.co.in, itsupport06@dinshaws.co.in',
         REPLY_TO: 'itsupport06@dinshaws.co.in',
      };
      break;
   default:
      // development environment
      hostConfig = {
         PROTOCOL: 'http',
         HOST: 'localhost',
         PORT: process.env.PORT || 4000,
         FEEDBACK_EMAIL: 'nitinbetharia@dinshaws.co.in , itsupport06@dinshaws.co.in',
         CAREER_EMAIL: 'nitinbetharia@dinshaws.co.in, itsupport06@dinshaws.co.in',
         REPLY_TO: 'itsupport06@dinshaws.co.in',
      };
      break;
}
console.log(process.env.NODE_ENV, hostConfig);
module.exports = hostConfig;
