## Foundry

### Set Enviroment

```bash
$ source .env
```

### Clean

```bash
$ forge clean
```

### Build

```bash
$ forge build
```

### Deploy

```bash
$ forge script script/DeployerSwapper.s.sol --rpc-url $SEPOLIA_RPC --private-key $PRIVATE_KEY --broadcast --ffi
```

### Test

```bash
$ forge test test/TesterSwapper.s.sol --fork-url $SEPOLIA_RPC
```
