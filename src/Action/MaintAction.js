/**
 * Created by Administrator on 2018/2/26.
 */
export const SKIP_MAINT = 'SKIP_MAINT';

function skipToMaint(data){
    return {
        type:'SKIP_MAINT',
        // plateNumber:data.PlateNumber
    }
}
