export default function logger(request, {}, next) {
  console.log(`${request.method} - ${request.url}`);
  next();
}
