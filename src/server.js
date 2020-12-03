const server = require("./services/server");

server.router.get(
  "/collection/:collection",
  require("./actions/collection/all")
);
server.router.post(
  "/collection/:collection",
  require("./actions/collection/create")
);
server.router.patch(
  "/collection/:collection/:id",
  require("./actions/collection/update")
);
server.router.get(
  "/collection/:collection/:id",
  require("./actions/collection/find")
);
server.router.delete(
  "/collection/:collection/:id",
  require("./actions/collection/remove")
);

server.listen();
