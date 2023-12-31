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
  Drained,
  MintedInsiderNft,
  MintedNft,
  OwnershipTransferred,
  Transfer
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
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
  let entity = new ApprovalForAll(
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
  let entity = new Drained(
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
  let entity = new MintedInsiderNft(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.DNft_id = event.params.id;
  entity.to = event.params.to;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMintedNft(event: MintedNftEvent): void {
  let entity = new MintedNft(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.DNft_id = event.params.id;
  entity.to = event.params.to;
  entity.price = event.transaction.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
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
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
