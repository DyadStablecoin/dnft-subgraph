import { Address, Bytes } from "@graphprotocol/graph-ts";

import { Vault as VaultEntity } from "../generated/schema";
import { Vault } from "../generated/VaultManagerSLL/Vault";

export function ensureVault(address: Bytes): VaultEntity {
  let entity = VaultEntity.load(address);

  if (!entity) {
    entity = new VaultEntity(address);
    let vault = Vault.bind(Address.fromBytes(address));
    entity.vaultManager = vault.vaultManager();
    entity.save();
  }

  return entity;
}
