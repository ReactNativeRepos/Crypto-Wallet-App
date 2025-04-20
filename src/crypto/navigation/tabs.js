import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { connect } from "react-redux";
import { setTradeModalVisibility } from '../stores/tab/tabActions';
import { Home, Portfolio, Market, Profile } from "../screens";
import { TabIcon } from '../components';
import { COLORS, icons } from "../constants"

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
            onPress={onPress}
        >{children}</TouchableOpacity>
    )
}

const Tabs = ({ isTradeModalVisible, setTradeModalVisibility }) => {

    function tradeTabButtonClickHandler() {
        setTradeModalVisibility(!isTradeModalVisible)
    }

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    height: 140,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }
            }
            listeners={{
                tabPress: e => {
                    if (isTradeModalVisible) {
                        e.preventDefault()
                    }
                }
            }
            }
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.home}
                                    label="Home"
                                > </TabIcon>
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.briefcase}
                                    label="Portfolio"
                                ></TabIcon>
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon
                                focused={focused}
                                icon={isTradeModalVisible ? icons.close : icons.trade}
                                iconStyle={isTradeModalVisible ? { width: 15, height: 15 } : null}
                                label="Home"
                                isTrade={true}
                            ></TabIcon>
                        )
                    },
                    tabBarButton: (props) => {
                        return (
                            <TabBarCustomButton
                                {...props}
                                onPress={() => {
                                    tradeTabButtonClickHandler()
                                }}
                            ></TabBarCustomButton>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.market}
                                    label="Market"
                                ></TabIcon>
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.profile}
                                    label="Profile"
                                ></TabIcon>
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if (isTradeModalVisible) {
                            e.preventDefault()
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

function mapStateToProps(state) {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTradeModalVisibility: (isVisible) => {
            return dispatch(setTradeModalVisibility(isVisible))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)