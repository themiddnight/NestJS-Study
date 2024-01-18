export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  base_url: process.env.BASE_URL,
  api_path: process.env.API_PATH,
});
