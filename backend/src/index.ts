import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from "hono";
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import auth from "./routes/auth";
import clients from './routes/clients';
import documents from './routes/documents';
import expenses from './routes/expenses';
import invoices from './routes/invoices';
import trips from './routes/trips';
import users from './routes/users';
import vehicles from './routes/vehicles';

const app = new Hono();

app.use(logger())
app.use(cors())
app.route('/users', users);
app.route("/auth", auth);
app.route("/clients", clients)
app.route("/documents", documents)
app.route("/expenses", expenses)
app.route("/invoices", invoices)
app.route("/trips", trips)
app.route("/vehicles", vehicles)



app.get(
  "/ui",
  swaggerUI({
    url: '/docs'
  })
);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
