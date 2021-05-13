import { getEvents, totalEvents } from "./controllers/event";
import { home } from "./controllers/home";
import { createDIDDocument, deleteDIDDocument, getDIDDocument, handleOperation, updateDIDDocument } from "./controllers/identity";
import { createServer, deleteServer, getLocalServer, getServer, getServers, updateLocalServer, updateServer } from "./controllers/server";
import { deleteVault, getVault, getVaults, putVault } from "./controllers/vault";
import { wellKnownDid, wellKnownDidConfiguration, wellKnownVaultConfiguration } from "./controllers/well-known";
import { requestLogger } from "./middleware/requestLogger";
import { Route } from "./types";

export const routes: Route[] = [
  {
    method: "get",
    path: "/",
    middleware: [],
    handler: home,
  },
  {
    method: "get",
    path: "/.well-known/vault-configuration.json",
    middleware: [requestLogger],
    handler: wellKnownVaultConfiguration,
  },
  {
    method: "get",
    path: "/.well-known/did.json",
    middleware: [requestLogger],
    handler: wellKnownDid,
  },
  {
    method: "get",
    path: "/.well-known/did-configuration.json",
    middleware: [requestLogger],
    handler: wellKnownDidConfiguration,
  },
  {
    method: "get",
    path: "/vault",
    middleware: [requestLogger],
    handler: getVaults,
  },
  {
    method: "get",
    path: "/vault/:id",
    middleware: [requestLogger],
    handler: getVault,
  },
  {
    method: "put",
    path: "/vault/:id",
    middleware: [requestLogger],
    handler: putVault,
  },
  {
    method: "delete",
    path: "/vault",
    middleware: [requestLogger],
    handler: deleteVault,
  },

  {
    method: "get",
    path: "/event",
    middleware: [requestLogger],
    handler: getEvents,
  },
  {
    method: "get",
    path: "/event/count",
    middleware: [requestLogger],
    handler: totalEvents,
  },
  // {
  //   method: "get",
  //   path: "/event/:id",
  //   middleware: [requestLogger],
  //   handler: getEvent,
  // },


  {
    method: "get",
    path: "/management/server",
    middleware: [requestLogger],
    handler: getServers,
  },
  {
    method: "get",
    path: "/management/server/:id",
    middleware: [requestLogger],
    handler: getServer,
  },
  {
    method: "post",
    path: "/management/server",
    middleware: [requestLogger],
    handler: createServer,
  },
  {
    method: "put",
    path: "/management/server/:id",
    middleware: [requestLogger],
    handler: updateServer,
  },
  {
    method: "delete",
    path: "/management/server/:id",
    middleware: [requestLogger],
    handler: deleteServer,
  },

  {
    method: "get",
    path: "/management/setup",
    middleware: [requestLogger],
    handler: getLocalServer,
  },
  {
    method: "put",
    path: "/management/setup",
    middleware: [requestLogger],
    handler: updateLocalServer,
  },


  {
    method: "post",
    path: "/operation",
    middleware: [requestLogger],
    handler: handleOperation,
  },


  // {
  //   method: "get",
  //   path: "/identity",
  //   middleware: [requestLogger],
  //   handler: getDIDDocuments,
  // },
  {
    method: "get",
    path: "/identity/:id",
    middleware: [requestLogger],
    handler: getDIDDocument,
  },
  {
    method: "post",
    path: "/identity",
    middleware: [requestLogger],
    handler: createDIDDocument,
  },
  {
    method: "put",
    path: "/identity/:id",
    middleware: [requestLogger],
    handler: updateDIDDocument,
  },
  {
    method: "delete",
    path: "/identity/:id",
    middleware: [requestLogger],
    handler: deleteDIDDocument,
  },
];
