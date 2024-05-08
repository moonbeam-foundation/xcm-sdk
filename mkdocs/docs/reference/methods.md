---
title: XCM SDK Reference - Methods - v0
description: A reference for the available methods in the Moonbeam XCM SDK that can be used to send XCM transfers between chains within the Polkadot/Kusama ecosystems.
---

# Moonbeam XCM SDK Reference: Methods

The SDK provides an API that enables you to get asset information for each supported asset, the source chains where a given asset can be sent from, and, given a source chain, the supported destination chains where the given asset can be sent. The SDK also includes helper methods related to transferring cross-chain assets, such as getting an estimated amount of the asset the destination account will receive, less any execution fees, and asset conversion methods based on the asset and the number of decimals it has. All of these enable you to transfer assets across chains easily and seamlessly.

## Core Methods {: #core-sdk-methods }

The SDK provides the following core methods:

|                                      Method                                       |                                      Description                                      |
| :-------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
|           [`init()`](../example-usage.md#initializing){target=\_blank}            |    Initializes the XCM SDK. **Must be called first before any other SDK methods**     |
|            [`deposit()`](../example-usage.md#deposit){target=\_blank}             |         Initiates a deposit to transfer assets from another chain to Moonbeam         |
|           [`withdraw()`](../example-usage.md#withdraw){target=\_blank}            |        Initiates a withdraw to transfer assets from Moonbeam to another chain         |
| [`subscribeToAssetsBalanceInfo()`](../example-usage.md#subscribe){target=\_blank} |   Listens for balance changes for a given account for each of the supported assets    |
|     [`isXcmSdkDeposit()`](../example-usage.md#deposit-check){target=\_blank}      | Returns a boolean indicating whether the given transfer data is for a deposit or not  |
|    [`isXcmSdkWithdraw()`](../example-usage.md#withdraw-check){target=\_blank}     | Returns a boolean indicating whether the given transfer data is for a withdraw or not |
|           [`toDecimal()`](../example-usage.md#decimals){target=\_blank}           |                       Returns a given balance in decimal format                       |
|           [`toBigInt()`](../example-usage.md#decimals){target=\_blank}            |                       Returns a given decimal in BigInt format                        |

## Deposit Methods {: #deposit-methods }

When building the transfer data needed for a deposit, you'll use multiple methods to build the underlying XCM message and send it:

|                              Method                               |                                                                                                              Description                                                                                                               |
| :---------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    [`deposit()`](../example-usage.md#deposit){target=\_blank}     |                                                                                 Initiates a deposit to transfer assets from another chain to Moonbeam                                                                                  |
|       [`from()`](../example-usage.md#from){target=\_blank}        |                                    Sets the source chain where the deposit will originate from. <br> This function is returned from the `deposit()` function. <br> **Must call `deposit()` first**                                     |
|    [`get()`](../example-usage.md#get-deposit){target=\_blank}     |           Sets the account on Moonbeam to deposit the funds to and the <br> source account where the deposit will be sent from. <br> This function is returned from the `from()` function. <br> **Must call `from()` first**           |
|   [`send()`](../example-usage.md#send-deposit){target=\_blank}    |                                          Sends the deposit transfer data given an amount to send. <br> This function is returned from the `get()` function. <br> **Must call `get()` first**                                           |
| [`getFee()`](../example-usage.md#get-fee-deposit){target=\_blank} | Returns an estimate of the fee for transferring a given amount, <br> which will be paid in the asset specified in the `deposit()` function. <br> This function is returned from the `get()` function. <br> **Must call `get()` first** |

## Withdraw Methods {: #withdraw-methods }

When building the transfer data needed for a withdraw, you'll use multiple methods to build the underlying XCM message and send it:

|                               Method                               |                                                                                                               Description                                                                                                               |
| :----------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    [`withdraw()`](../example-usage.md#withdraw){target=\_blank}    |                                                                                 Initiates a withdraw to transfer assets from Moonbeam to another chain                                                                                  |
|          [`to()`](../example-usage.md#to){target=\_blank}          |                                 Sets the destination chain where the assets will be withdrawn to. <br> This function is returned from the `withdraw()` function. <br> **Must call `withdraw()` first**                                  |
|    [`get()`](../example-usage.md#get-withdraw){target=\_blank}     |                                   Sets the account on the destination chain to send the withdrawn funds to. <br> This function is returned from the `to()` function. <br> **Must call `to()` first**                                    |
|   [`send()`](../example-usage.md#send-withdraw){target=\_blank}    |                                          Sends the withdraw transfer data given an amount to send. <br> This function is returned from the `get()` function. <br> **Must call `get()` first**                                           |
| [`getFee()`](../example-usage.md#get-fee-withdraw){target=\_blank} | Returns an estimate of the fee for transferring a given amount, <br> which will be paid in the asset specified in the `withdraw()` function. <br> This function is returned from the `get()` function. <br> **Must call `get()` first** |
