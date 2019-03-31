import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, Platform, SafeAreaView, FlatList, Picker } from 'react-native'
import { Container, Header, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, Footer, View, FooterTab, Badge } from 'native-base'

import NavigationService from '@Service/Navigation'

import FEATURED from './Featured'
import Modal from "react-native-modal";

import Style from '@Theme/Style'
import Styles from '@Screen/Public/ShopAds/Style'

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,    
            isFilterModalVisible: false,
            price:'low',
        };
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    _toggleMobileModal = () =>
    this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible });

    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#39405B" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        NavigationService.navigate('PublicShopping')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Electronics'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                    <Button transparent style={Style.actionBtnRight} onPress={() => {
                        NavigationService.navigate('PublicAdsSearch')
                    }}>
                        <Icon active name='search' style={Style.actionIcon} type="FontAwesome" />
                    </Button>
                </View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <Modal isVisible={this.state.isFilterModalVisible}>
                    <View style={Styles.signBg}>
                        <View style={Styles.modalTopRow}>
                            <View style={{ flexDirection: 'row'}}>
                                <Icon type="FontAwesome"  name="filter" style={{color: '#39405B'}}/>
                                <Text style={Styles.modalTitle}>Product Filter</Text>
                            </View>                            
                            <View style={Styles.modalButton}>
                                <Button style={Styles.btnApply} onPress={this._toggleMobileModal}>
                                    <Text style={Styles.applyBtnText}>{'apply'.toUpperCase()}</Text>                        
                                </Button>
                            </View>
                        </View>
                        <View style={Styles.modalRow}>
                            <Text style={Styles.modalLabel}>Price</Text>
                            <View style={Styles.formPicker}>
                                <Picker
                                    selectedValue={this.state.price}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ price: itemValue })}>
                                    <Picker.Item label="Low" value="low" style={Styles.pickerText} />
                                    <Picker.Item label="Medium" value="medium" />
                                    <Picker.Item label="High" value="high" />
                                </Picker>
                            </View>
                        </View>                            
                        <View style={Styles.modalRow}>
                            <Text style={Styles.modalLabel}>Product Categories</Text>
                            <View style={Styles.formPicker}>
                                <Picker
                                    selectedValue={this.state.price}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ price: itemValue })}>
                                    <Picker.Item label="Low" value="low" style={Styles.pickerText} />
                                    <Picker.Item label="Medium" value="medium" />
                                    <Picker.Item label="High" value="high" />
                                </Picker>
                            </View>
                        </View>                            
                    </View>
                </Modal>
                <ImageBackground source={require('@Asset/images/bg.png')} imageStyle={'cover'} style={Style.slider}>
                    <View style={Styles.picker}>
                        <Text style={{color: '#39405B'}} >1,200 Electronics</Text>
                    </View>
                    <View style={Styles.section}>
                        <FlatList
                            data={FEATURED}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, separators }) => (
                                <TouchableOpacity style={Styles.item} underlayColor='transparent' onPress={() => { NavigationService.navigate('PublicShopAdDetails') }}>
                                    <View style={Styles.itemLeft}>
                                        <Image source={{ uri: item.image }} style={Styles.itemImg} />
                                        {/* <Icon name="bookmark" type="FontAwesome" style={Styles.itemFavorite} /> */}
                                    </View>
                                    <View style={Styles.itemRight}>
                                        <Text style={Styles.itemTitle}>{item.title}</Text>
                                        <Text style={Styles.itemPrice}>
                                            {item.price}
                                        </Text>
                                        <View style={Styles.itemPosted}>
                                            <Icon name="square" type="FontAwesome" style={Styles.itemIcon} />
                                            <Text style={Styles.itemDate}>{item.spec}</Text>
                                        </View>
                                        <View style={Styles.itemPosted}>
                                            <Icon name="square" type="FontAwesome" style={Styles.itemIcon} />
                                            <Text style={Styles.itemDate}>{item.display}</Text>
                                        </View>
                                        <View style={Styles.itemPosted}>
                                            <Icon name="square" type="FontAwesome" style={Styles.itemIcon} />
                                            <Text style={Styles.itemDate}>{item.camera}</Text>
                                        </View>                                        
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </ImageBackground>
            </Content>

            <Footer style={Style.greyTopLine}>
                <FooterTab style={Style.bgFilter}>
                    <Button style={Style.bgFilter} onPress={() => {
                        NavigationService.navigate('PublicAds')
                    }}>
                        <Icon name="sort-amount-asc" type="FontAwesome" style={Style.textBlue} />
                        <Text style={Style.textBlack}>Sort by</Text>
                    </Button>
                    <Button style={Style.bgFilter} onPress={this._toggleMobileModal}>
                        <Icon name="filter" type="FontAwesome" style={Style.textBlue} />
                        <Text style={Style.textBlack}>Filter</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    }
}