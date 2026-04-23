import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface FeaturedGame {
  id: string;
  title: string;
}

interface LibraryGame {
  id: string;
  title: string;
  platform: string;
  progress: number;
}


const featuredGames: FeaturedGame[] = [
  { id: '1', title: 'Elden Ring' }, 
  { id: '2', title: 'Cyberpunk 2077' }, 
  { id: '3', title: 'Marvel Rivals' }, 
];

const libraryGames: LibraryGame[] = [
  { id: '1', title: 'Elden Ring', platform: 'PC/Console', progress: 95 }, 
  { id: '2', title: 'Cyberpunk 2077', platform: 'PC/Console', progress: 60 }, 
  { id: '3', title: 'Marvel Rivals', platform: 'PC', progress: 100 }, 
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('Home');

  const HomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.userName}>Geraldo</Text>
              <Text style={styles.userLevel}>Nível: 15 / EXP: 1500</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 10 }} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar jogos, guias ou jogadores..." 
            placeholderTextColor="#888" 
          />
        </View>

        {/* Destaques */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destaques</Text>
          <Text style={styles.seeAll}>Ver tudo</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {featuredGames.map((game) => (
            <View key={game.id} style={styles.featuredImage} />
          ))}
        </ScrollView>

        {/* Minha Biblioteca */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Minha Biblioteca</Text>
          <Text style={styles.seeAll}>3 ativos</Text>
        </View>

        {libraryGames.map((game) => (
          <TouchableOpacity 
            key={game.id} 
            style={styles.gameCard}
            onPress={() => setCurrentScreen('Details')}
          >
            <View style={styles.gameCardImage} />
            <View style={styles.gameCardInfo}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gamePlatform}>{game.platform}</Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${game.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{game.progress}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAB (Adicionar Jogo) */}
      <TouchableOpacity style={styles.fab} onPress={() => setCurrentScreen('Add')}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#7B61FF" />
        <Ionicons name="game-controller-outline" size={24} color="#888" />
        <Ionicons name="people-outline" size={24} color="#888" />
        <Ionicons name="person-outline" size={24} color="#888" />
      </View>
    </SafeAreaView>
  );

  const DetailsScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: 20 }]}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Detalhes do Jogo</Text>
        <Ionicons name="settings-outline" size={24} color="#FFF" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroBanner} />
        <Text style={styles.detailsTitle}>Jogo Selecionado</Text>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Jogar Agora</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  const AddGameScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: 20 }]}>
        <Text style={styles.screenTitle}>Adicionar Novo Jogo</Text>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.inputLabel}>Capa do Jogo</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <Ionicons name="image-outline" size={40} color="#7B61FF" />
          <Text style={styles.uploadText}>Enviar Imagem</Text>
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Título do Jogo</Text>
        <TextInput style={styles.input} placeholder="Ex: Elden Ring" placeholderTextColor="#555" />

        <View style={styles.row}>
          <View style={{flex: 1, marginRight: 10}}>
            <Text style={styles.inputLabel}>Plataforma</Text>
            <TextInput style={styles.input} placeholder="PC/Console" placeholderTextColor="#555" />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.inputLabel}>Gênero</Text>
            <TextInput style={styles.input} placeholder="Ação / RPG" placeholderTextColor="#555" />
          </View>
        </View>

        <Text style={styles.inputLabel}>Desenvolvedora</Text>
        <TextInput style={styles.input} placeholder="Ex: FromSoftware" placeholderTextColor="#555" />

        <Text style={styles.inputLabel}>Descrição</Text>
        <TextInput 
          style={[styles.input, { height: 100, textAlignVertical: 'top', paddingTop: 15 }]} 
          placeholder="Insira um resumo sobre o jogo..." 
          placeholderTextColor="#555"
          multiline
        />

        <TouchableOpacity style={[styles.primaryButton, {marginTop: 30, marginBottom: 15}]}>
          <Text style={styles.primaryButtonText}>Salvar Jogo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setCurrentScreen('Home')}>
          <Text style={styles.secondaryButtonText}>Descartar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0B0C10" translucent={true} />
      {currentScreen === 'Home' && <HomeScreen />}
      {currentScreen === 'Details' && <DetailsScreen />}
      {currentScreen === 'Add' && <AddGameScreen />}
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0B0C10',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#1F2833', marginRight: 12 },
  userName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  userLevel: { color: '#888', fontSize: 12 },
  iconButton: { padding: 8, backgroundColor: '#1F2833', borderRadius: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1F2833', borderRadius: 12, paddingHorizontal: 15, height: 50, marginBottom: 20 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#7B61FF', fontSize: 14 },
  horizontalScroll: { marginBottom: 20 },
  featuredImage: { width: 140, height: 180, borderRadius: 12, marginRight: 15, backgroundColor: '#1F2833' },
  gameCard: { flexDirection: 'row', backgroundColor: '#1F2833', borderRadius: 12, padding: 12, marginBottom: 15, alignItems: 'center' },
  gameCardImage: { width: 60, height: 80, backgroundColor: '#333', borderRadius: 8, marginRight: 15 },
  gameCardInfo: { flex: 1 },
  gameTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  gamePlatform: { color: '#888', fontSize: 12, marginBottom: 10 },
  progressContainer: { height: 4, backgroundColor: '#333', borderRadius: 2, marginBottom: 5 },
  progressBar: { height: 4, backgroundColor: '#7B61FF', borderRadius: 2 },
  progressText: { color: '#7B61FF', fontSize: 10, alignSelf: 'flex-end' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#0B0C10', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#1F2833' },
  fab: { position: 'absolute', bottom: 80, right: 20, backgroundColor: '#7B61FF', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3 },
  screenTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  cancelText: { color: '#7B61FF', fontSize: 16, padding: 10 },
  heroBanner: { height: 200, backgroundColor: '#1F2833', borderRadius: 12, marginBottom: 20 },
  detailsTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  inputLabel: { color: '#FFF', fontSize: 14, marginBottom: 8, marginTop: 15, fontWeight: '600' },
  input: { backgroundColor: '#1F2833', color: '#FFF', height: 50, borderRadius: 10, paddingHorizontal: 15, fontSize: 15 },
  uploadBox: { height: 120, backgroundColor: '#1F2833', borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#7B61FF', justifyContent: 'center', alignItems: 'center' },
  uploadText: { color: '#7B61FF', marginTop: 10, fontWeight: '500' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  primaryButton: { backgroundColor: '#7B61FF', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: 'transparent', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  secondaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});