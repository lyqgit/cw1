/**
 * Created by Administrator on 2018/2/24.
 */
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';


/**
 * 默认存储30天
 * @type {Storage}
 */
export const storage = new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:1000*3600*24*30,
    enableCache:true,
});