const deps = require("./deps");

module.exports = async ({ context }) => {
  const walletRoot = deps.uuid()
  const balanceRoot = deps.uuid()

  const { tokens, principle, roots: { scene: sceneRoot } } = await deps.command({
    name: "create",
    domain: "scene",
    service: "core",
    network: "sustainers.network"
  })
    .set({ context, tokenFn: deps.connectionNetworkToken })
    .issue(
      {
        root: walletRoot,
        domain: process.env.DOMAIN,
        service: process.env.SERVICE,
        network: process.env.NETWORK
      }
    );

  await deps.command({
    name: "add-roles",
    domain: "principle",
    service: principle.service,
    network: principle.network
  })
    .set({ context, tokenFn: deps.connectionNetworkToken })
    .issue({
          roles: [
            {
              id: "NodeAdmin",
              service: process.env.SERVICE,
              network: process.env.NETWORK
            }
          ]
    }, { root: principle.root });

  return {
    events: [{
        action: "create", 
        domain: "wallet", 
        payload: {},
        root: walletRoot, 
        correctNumber: 0 
      }, { 
        action: "initialize", 
        payload: { 
          balance: { 
            root: balanceRoot, 
            service: process.env.SERVICE, 
            network: process.env.NETWORK 
          },
          scene: { 
            root: sceneRoot, 
            service: "core", 
            network: "sustainers.network" 
          }
        }, 
        root: walletRoot, 
        correctNumber: 0 
      }
    ],
    response: { 
      ...(tokens && { tokens }), 
      roots: { wallet: walletRoot, balance: balanceRoot, scene: sceneRoot }}
  };
};
