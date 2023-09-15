import {
  Added as AddedEvent,
  Removed as RemovedEvent
} from "../generated/VaultManager/VaultManager";
import { Vault } from "../generated/schema";

export function handleAdded(event: AddedEvent): void {
  let entity = new Vault(event.params.vault);

  entity.save();
}

export function handleRemoved(event: RemovedEvent): void {
  let entity = Vault.load();
}
