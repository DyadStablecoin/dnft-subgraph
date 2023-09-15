import { log } from "@graphprotocol/graph-ts";

import {
  LicenseCall,
  RemoveLicenseCall
} from "../generated/VaultManagerSLL/VaultManagerSLL";
import { ensureVault } from "./vault";

export function handleLicense(call: LicenseCall): void {
  const vault = ensureVault(call.inputs.vault);
  vault.isLicensed = true;
  vault.save();
}

export function handleRemoveLicense(call: RemoveLicenseCall): void {
  const vault = ensureVault(call.inputs.vault);
  vault.isLicensed = false;
  vault.save();
}
