export default{
    status:{
        success:'success',
        fail:'fail',
        pending:'pending',
        inprocess:'inprocess',
        error:'error',
    },
    statuscolor:{
        success:'green-darken-1',
        fail:'red',
        pending:'light-blue-darken-1',
        inprocess:'yellow-darken-1',
        error:'red',
    },
    questionTypeOption:[
        {
            value:'Text',
            key:'text',
        },
        {
            value:'Select',
            key:'select',
        },
        {
            value:'Checkbox',
            key:'checkbox',
        },
        {
            value:'Radio',
            key:'radio',
        }
    ],
    pagination:{
        per_page:6,
        page:1,
        total:0
    }
}