// SPDX-License-Identifier: GPL-3.0-only
pragma solidity >=0.8.3;

/// @dev The Xtokens contract's address.
address constant XTOKENS_ADDRESS = 0x0000000000000000000000000000000000000804;

/// @dev The Xtokens contract's instance.
Xtokens constant XTOKENS_CONTRACT = Xtokens(XTOKENS_ADDRESS);

/// @author The Moonbeam Team
/// @title Xtokens Interface
/// @dev The interface through which solidity contracts will interact with xtokens pallet
/// @custom:address 0x0000000000000000000000000000000000000804
interface Xtokens {
    // A multilocation is defined by its number of parents and the encoded junctions (interior)
    struct Multilocation {
        uint8 parents;
        bytes[] interior;
    }

    // A Currency is defined by address and the amount to be transferred
    struct Currency {
        address currencyAddress;
        uint256 amount;
    }

    /// Transfer a token through XCM based on its currencyId
    ///
    /// @dev The token transfer burns/transfers the corresponding amount before sending
    /// @param currencyAddress The ERC20 address of the currency we want to transfer
    /// @param amount The amount of tokens we want to transfer
    /// @param destination The Multilocation to which we want to send the tokens
    /// @param destination The weight we want to buy in the destination chain
    /// @custom:selector b9f813ff
    function transfer(
        address currencyAddress,
        uint256 amount,
        Multilocation memory destination,
        uint64 weight
    ) external;

    /// Transfer several tokens at once through XCM based on its address specifying fee
    ///
    /// @dev The token transfer burns/transfers the corresponding amount before sending
    /// @param currencies The currencies we want to transfer, defined by their address and amount.
    /// @param feeItem Which of the currencies to be used as fee
    /// @param destination The Multilocation to which we want to send the tokens
    /// @param weight The weight we want to buy in the destination chain
    /// @custom:selector ab946323
    function transferMultiCurrencies(
        Currency[] memory currencies,
        uint32 feeItem,
        Multilocation memory destination,
        uint64 weight
    ) external;
}
