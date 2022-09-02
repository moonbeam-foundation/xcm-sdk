import { AssetSymbol } from '../../constants';
import { AssetsMap } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MoonriverAssets } from './moonriver.interfaces';

export const MOONRIVER_ASSETS = <const>[
  AssetSymbol.AUSD,
  AssetSymbol.BNC,
  AssetSymbol.CRAB,
  AssetSymbol.CSM,
  AssetSymbol.HKO,
  AssetSymbol.KAR,
  AssetSymbol.KBTC,
  AssetSymbol.KINT,
  AssetSymbol.KMA,
  AssetSymbol.KSM,
  AssetSymbol.LIT,
  AssetSymbol.MOVR,
  AssetSymbol.PHA,
  AssetSymbol.RMRK,
  AssetSymbol.SDN,
  AssetSymbol.TEER,
  AssetSymbol.USDT,
];

export const MOONRIVER_ASSETS_CONFIGS: AssetsMap<MoonriverAssets> = {
  [AssetSymbol.AUSD]: {
    id: '214920334981412447805621250067209749032',
    erc20Id: '0xffffffffa1b026a00fbaa67c86d5d1d5bf8d8228',
    originSymbol: AssetSymbol.AUSD,
  },
  [AssetSymbol.BNC]: {
    id: '319623561105283008236062145480775032445',
    erc20Id: '0xfffffffff075423be54811ecb478e911f22dde7d',
    originSymbol: AssetSymbol.BNC,
  },
  [AssetSymbol.CRAB]: {
    id: '173481220575862801646329923366065693029',
    erc20Id: '0xffffffff8283448b3cb519ca4732f2dddc6a6165',
    originSymbol: AssetSymbol.CRAB,
  },
  [AssetSymbol.CSM]: {
    id: '108457044225666871745333730479173774551',
    erc20Id: '0xffffffff519811215e05efa24830eebe9c43acd7',
    originSymbol: AssetSymbol.CSM,
  },
  [AssetSymbol.HKO]: {
    id: '76100021443485661246318545281171740067',
    erc20Id: '0xffffffff394054bcda1902b6a6436840435655a3',
    originSymbol: AssetSymbol.HKO,
  },
  [AssetSymbol.KAR]: {
    id: '10810581592933651521121702237638664357',
    erc20Id: '0xffffffff08220ad2e6e157f26ed8bd22a336a0a5',
    originSymbol: AssetSymbol.KAR,
  },
  [AssetSymbol.KBTC]: {
    id: '328179947973504579459046439826496046832',
    erc20Id: '0xfffffffff6e528ad57184579beee00c5d5e646f0',
    originSymbol: AssetSymbol.KBTC,
  },
  [AssetSymbol.KINT]: {
    id: '175400718394635817552109270754364440562',
    erc20Id: '0xffffffff83f4f317d3cbf6ec6250aec3697b3ff2',
    originSymbol: AssetSymbol.KINT,
  },
  [AssetSymbol.KMA]: {
    id: '213357169630950964874127107356898319277',
    erc20Id: '0xffffffffa083189f870640b141ae1e882c2b5bad',
    originSymbol: AssetSymbol.KMA,
  },
  [AssetSymbol.KSM]: {
    id: '42259045809535163221576417993425387648',
    erc20Id: '0xffffffff1fcacbd218edc0eba20fc2308c778080',
    originSymbol: AssetSymbol.KSM,
  },
  [AssetSymbol.LIT]: {
    id: '65216491554813189869575508812319036608',
    erc20Id: '0xffffffff31103d490325bb0a8e40ef62e2f614c0',
    originSymbol: AssetSymbol.LIT,
  },
  [AssetSymbol.MOVR]: {
    id: '',
    erc20Id: '0x0000000000000000000000000000000000000802',
    originSymbol: AssetSymbol.MOVR,
    isNative: true,
  },
  [AssetSymbol.PHA]: {
    id: '189307976387032586987344677431204943363',
    erc20Id: '0xffffffff8e6b63d9e447b6d4c45bda8af9dc9603',
    originSymbol: AssetSymbol.PHA,
  },
  [AssetSymbol.RMRK]: {
    id: '182365888117048807484804376330534607370',
    erc20Id: '0xffffffff893264794d9d57e1e0e21e0042af5a0a',
    originSymbol: AssetSymbol.RMRK,
    originAssetId: 8,
  },
  [AssetSymbol.SDN]: {
    id: '16797826370226091782818345603793389938',
    erc20Id: '0xffffffff0ca324c842330521525e7de111f38972',
    originSymbol: AssetSymbol.SDN,
  },
  [AssetSymbol.TEER]: {
    id: '105075627293246237499203909093923548958',
    erc20Id: '0xffffffff4f0cd46769550e5938f6bee2f5d4ef1e',
    originSymbol: AssetSymbol.TEER,
  },
  [AssetSymbol.USDT]: {
    id: '311091173110107856861649819128533077277',
    erc20Id: '0xffffffffea09fb06d082fd1275cd48b191cbcd1d',
    originSymbol: AssetSymbol.USDT,
    originAssetId: 1984,
  },
};
