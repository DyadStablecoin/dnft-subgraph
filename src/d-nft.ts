import { BigInt, Bytes } from "@graphprotocol/graph-ts";

import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Drained as DrainedEvent,
  MintedInsiderNft as MintedInsiderNftEvent,
  MintedNft as MintedNftEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent
} from "../generated/DNft/DNft";
import {
  Approval,
  ApprovalForAll,
  DNft,
  Drained,
  MintedInsiderNft,
  MintedNft,
  OwnershipTransferred,
  Transfer
} from "../generated/schema";
import { ensureUser } from "./user";

export function createDnft(
  tokenId: BigInt,
  ownerAddress: Bytes,
  mint: Bytes
): DNft {
  const owner = ensureUser(ownerAddress);
  const id = tokenId.toString();
  const dnft = new DNft(id);
  dnft.tokenId = tokenId;
  dnft.owner = owner.id;
  dnft.mint = mint;
  dnft.save();
  return dnft;
}

export function handleApproval(event: ApprovalEvent): void {
  const entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  const entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDrained(event: DrainedEvent): void {
  const entity = new Drained(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMintedInsiderNft(event: MintedInsiderNftEvent): void {
  const entity = new MintedInsiderNft(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.DNft_id = event.params.id;
  entity.to = event.params.to;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  createDnft(event.params.id, event.params.to, entity.id);
}

export function handleMintedNft(event: MintedNftEvent): void {
  const entity = new MintedNft(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.DNft_id = event.params.id;
  entity.to = event.params.to;
  entity.price = event.transaction.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  createDnft(event.params.id, event.params.to, entity.id);
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  const entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  const entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  ensureUser(event.params.to);
}
