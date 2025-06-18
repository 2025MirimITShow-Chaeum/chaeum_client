import React, { useEffect, useState } from 'react';
import { View, Image, Text, Modal, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles/Profile.styles';
import GlobalScreenWrapper from '../constants/GlobalScreenWrapper';
import BottomNav from "../components/BottomNav";
import InfoCard from '../components/InfoCard';
import EditIcon from '../assets/EditIcon.svg';
import TrashIcon from '../assets/TrashIcon.svg';
import AddIcon from '../assets/AddIcon.svg';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('채움이');
  const [slogan, setSlogan] = useState('오늘 하루가 미래를 바꾼다.');
  // 임시로 수정
  const [tempName, setTempName] = useState(name);
  const [tempSlogan, setTempSlogan] = useState(slogan);
  const attendance_count = 8;
  const heart = 38;

  const [newDday, setNewDday] = useState('');
  const [ddayItems, setDdayItems] = useState([
    { id: 1, text: 'D-29 기말고사' },
    { id: 2, text: 'D-245 수능' },
    { id: 3, text: 'D+36 채움 시작' },
  ]);

  const [groupTags, setGroupTags] = useState([
    '😭 수학키움반',
    '응용과 개발',
    '과학 A팀',
    '🧠 파이팅국어',
    '😔 김지혜 바보',
    'ITshow 밤샘 개발팟',
  ]);
  const currentGroupCount = groupTags.length;

  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showGroupBottomSheet, setShowGroupBottomSheet] = useState(false);

  const handleProfileEdit = () => {
    setShowProfileEdit(true); // 모달 열기
  };

  const [showDdayDeleteModal, setShowDdayDeleteModal] = useState(false);
  const [showDdayAddModal, setShowDdayAddModal] = useState(false);
  const [ddayTitle, setDdayTitle] = useState('');
  const [ddayDate, setDdayDate] = useState('');

  const calculateDdayText = (dateStr, title) => {
    const today = new Date();
    const target = new Date(dateStr);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24)); // 일 수 차이

    let prefix = '';
    if (diff > 0) prefix = `D-${diff}`;
    else if (diff === 0) prefix = 'D-day';
    else prefix = `D+${Math.abs(diff)}`;

    return `${prefix} ${title}`;
  };

  const handleAddGroup = () => {
    setShowGroupBottomSheet(true); // 바텀시트 열기
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <GlobalScreenWrapper>
        <View style={styles.LogoBox}>
          <Image source={require('../assets/profileLogo.png')} style={styles.Logo} />
        </View>
        <View style={styles.profileBox}>
          <View style={styles.circle}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.profile}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.slogan}>{slogan}</Text>
          </View>
        </View>
        <View style={styles.reactionBox}>
          <View style={styles.reactions}>
            <Image source={require('../assets/불.png')} style={styles.reactionImg} />
            <Text style={styles.reactionText}>{attendance_count}일 연속 채움중</Text>
          </View>
          <View style={styles.reactions}>
            <Image source={require('../assets/하트.png')} style={styles.reactionImg} />
            <Text style={styles.reactionText}>받은 좋아요 {heart}개</Text>
          </View>
        </View>

        <View>
          <InfoCard title="프로필" icon={<EditIcon />} onIconPress={handleProfileEdit}>
            <View style={styles.row}>
              <Text>👤</Text>
              <Text>{name}</Text>
            </View>
            <View style={styles.row}>
              <Text>💬</Text>
              <Text>{slogan}</Text>
            </View>
          </InfoCard>

          <InfoCard
            title="D-day"
            icon={<TrashIcon />}
            onIconPress={() => setShowDdayDeleteModal(true)}
          >
            {ddayItems.map((item) => (
              <Text key={item.id}>{item.text}</Text>
            ))}
            <TouchableOpacity style={styles.addDday} onPress={() => setShowDdayAddModal(true)}>
              <AddIcon fill="#C8C8C8" />
              <Text style={{ color: '#c8c8c8' }}>디데이 추가하기</Text>
            </TouchableOpacity>
          </InfoCard>

          <InfoCard title="스터디 그룹" icon={<AddIcon fill="#f1f1f1" />} onIconPress={handleAddGroup} contentStyle={styles.tagContainer}>
            {groupTags.map((tag, idx) => (
              <Text key={idx} style={styles.tag}>{tag}</Text>
            ))}
          </InfoCard>

          {/* 프로필 수정 모달 */}
          <Modal visible={showProfileEdit} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>이름</Text>
                <TextInput
                  value={tempName}
                  onChangeText={setTempName}
                  style={styles.input}
                />
                <Text style={styles.modalText}>슬로건</Text>
                <TextInput
                  value={tempSlogan}
                  onChangeText={setTempSlogan}
                  style={styles.input}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button title="취소" onPress={() => setShowProfileEdit(false)} />
                  <Button
                    title="저장"
                    onPress={() => {
                      setName(tempName);
                      setSlogan(tempSlogan);
                      setShowProfileEdit(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>

          {/* 디데이 삭제 모달 */}
          <Modal visible={showDdayDeleteModal} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>삭제할 D-day를 선택하세요</Text>

                {ddayItems.length === 0 && (
                  <Text style={{ textAlign: 'center', marginVertical: 10 }}>삭제할 항목이 없습니다.</Text>
                )}

                {ddayItems.map((item) => (
                  <View key={item.id} style={styles.ddayRow}>
                    <Text style={{ flex: 1 }}>{item.text}</Text>
                    <Button
                      title="삭제"
                      onPress={() => {
                        setDdayItems(prev => prev.filter(dday => dday.id !== item.id));
                      }}
                    />
                  </View>
                ))}

                <Button title="닫기" onPress={() => setShowDdayDeleteModal(false)} />
              </View>
            </View>
          </Modal>

          {/* 디데이 추가 모달 */}
          <Modal visible={showDdayAddModal} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>D-day 제목</Text>
                <TextInput
                  placeholder="예: 수능"
                  value={ddayTitle}
                  onChangeText={setDdayTitle}
                  style={styles.input}
                />

                <Text style={styles.modalText}>날짜 (YYYY-MM-DD)</Text>
                <TextInput
                  placeholder="예: 2025-07-10"
                  value={ddayDate}
                  onChangeText={setDdayDate}
                  style={styles.input}
                  keyboardType="numbers-and-punctuation"
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button title="취소" onPress={() => {
                    setDdayTitle('');
                    setDdayDate('');
                    setShowDdayAddModal(false);
                  }} />
                  <Button title="추가" onPress={() => {
                    if (!ddayTitle.trim() || !ddayDate.trim()) return;

                    const text = calculateDdayText(ddayDate, ddayTitle);
                    const newItem = {
                      id: Date.now(),
                      text
                    };

                    setDdayItems(prev => [...prev, newItem]);
                    setDdayTitle('');
                    setDdayDate('');
                    setShowDdayAddModal(false);
                  }} />
                </View>
              </View>
            </View>
          </Modal>


          {/* 그룹 모달 */}
          <Modal visible={showGroupBottomSheet} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.groupModal}>
                <View style={styles.groupModalHeader}>
                  <Text style={styles.modalText}>그룹 추가하기</Text>
                  <Text style={styles.modalSubText}>현재 참여 그룹 <Text style={styles.count}>{currentGroupCount}개</Text></Text>
                </View>

                <TouchableOpacity
                  style={styles.groupCreateBtn}
                  onPress={() => {
                    setShowGroupBottomSheet(false);
                    navigation.navigate('GroupName');
                  }}
                >
                  <Text style={styles.groupCreateBtnText}>새로운 스터디 그룹 만들기</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.groupJoinBtn}
                  onPress={() => {
                    setShowGroupBottomSheet(false);
                    navigation.navigate('GroupJoin1');
                  }}
                >
                  <Text style={styles.groupJoinBtnText}>친구에게 받은 그룹코드로 참여하기</Text>
                </TouchableOpacity>

                <Button title="닫기" onPress={() => setShowGroupBottomSheet(false)} />
              </View>
            </View>
          </Modal>

        </View>

      </GlobalScreenWrapper >
      <BottomNav />
    </View >
  );
}