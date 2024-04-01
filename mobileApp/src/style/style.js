import { StyleSheet } from 'react-native'
import { color } from './color'


const commonStyle = StyleSheet.create({
    pageHeading:{
        fontSize:30,
        textAlign:'center',
        color:'#0B0020'
    },
    defaultPadding:{
        padding:10
    },
    defaultImage:{
        width:360,
        height:250,
        marginBottom:20
    },
    loginLogo:{
        width:170,
        height:80,
        marginBottom:20
    },
    itemCenter:{
        alignItems:'center',
        justifyContent:'center'
    },
    defaultBackgroung:{
        backgroundColor:'#fff',
        flex:1
    },
    defaultColor:{
        color:'#0B0020'
    },
    defaultHeading:{
        fontSize:24,
        fontWeight: 600
    },
    defaultTextInput:{
        borderColor:'#DFD6E8',
        borderWidth:1,
        borderRadius:5
    },
    defaultMarginBottom:{
        marginBottom:8
    },
    primaryButton:{
        borderRadius:6,
        backgroundColor:color.primaryColor,
        color:'#fff',
        padding:5
    },
    secondaryButton:{
        borderRadius:6,
        backgroundColor:'gray',
        color:'#fff',
        padding:5
    },
    bottomNavigation:{
        elevation: 3,
        shadowColor: '#8E8993',
        flexDirection:'row',
        height:70,
        alignItems:'center',
        justifyContent:'space-around',
        borderRadius:8,
        backgroundColor:'#fff'
    },
    // from add in dark theme also
    customTabs:{
        color: '#000'
    },
    customTabsActive:{
        color: color.primaryColor,
        fontWeight: 'bold'
    },
    primaryBackgroundColor:{
        backgroundColor:color.primaryColor
    }
})


const commonDarkStyle = StyleSheet.create({
    pageHeading:{
        fontSize:30,
        textAlign:'center',
        color:'#0B0020'
    },
    defaultPadding:{
        padding:10
    },
    defaultImage:{
        width:250,
        height:310
    },
    itemCenter:{
        alignItems:'center',
        justifyContent:'center'
    },
    defaultBackgroung:{
        backgroundColor:'#000',
        flex:1
    },
    defaultColor:{
        color:'#fff'
    },
    defaultHeading:{
        fontSize:24,
        fontWeight: 600
    },
    defaultTextInput:{
        borderColor:'#DFD6E8',
        borderWidth:1,
        borderRadius:5
    },
    defaultMarginBottom:{
        marginBottom:8
    },
    primaryButton:{
        borderRadius:6,
        backgroundColor:color.primaryColor,
        color:'#fff',
        padding:5
    },
    secondaryButton:{
        borderRadius:6,
        backgroundColor:'gray',
        color:'#fff',
        padding:5
    },
    bottomNavigation:{
        elevation: 3,
        shadowColor: '#8E8993',
        flexDirection:'row',
        height:70,
        alignItems:'center',
        justifyContent:'space-around',
        borderRadius:8,
        backgroundColor:'#fff'
    },
})


const cardStyle = StyleSheet.create({
    defaultCard:{
        borderWidth:1,
        borderColor:'#DFD6E8',
        padding:12,
        borderRadius:8,
        backgroundColor:'#fcfaff',
        flexDirection:'row'
    },
    defaultCardPic:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'#C69DF5'
    }
})

export {commonStyle,cardStyle, commonDarkStyle}