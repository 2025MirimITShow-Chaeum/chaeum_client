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
import { fetchUserInfo, updateUserInfo, fetchDdays, postDday, deleteDday } from '../utils/api';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const attendance_count = 8;
  const heart = 38;

  useEffect(() => {
    const UserInfo = async () => {
      try {
        const user = await fetchUserInfo();
        setName(user.nickname);
        setSlogan(user.slogan ?? "당신의 슬로건을 적어보세요",);
        setProfileImage(user.profile_image ?? "")
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };

    UserInfo();
  }, []);

  const [ddayItems, setDdayItems] = useState([]);

  useEffect(() => {
    const getDdays = async () => {
      try {
        const ddays = await fetchDdays();
        setDdayItems(ddays);
      } catch (err) {
        console.log("디데이 불러오기 실패: ", err)
        setDdayItems([]);
      }
    }
    getDdays();
  }, [])

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

    return `${prefix}  ${title}`;
  };

  const handleAddGroup = () => {
    setShowGroupBottomSheet(true); // 바텀시트 열기
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <GlobalScreenWrapper>
          <View style={styles.LogoBox}>
            <Image source={require('../assets/profileLogo.png')} style={styles.Logo} />
          </View>
          <View style={styles.profileBox}>
            <View style={styles.circle}>
              <Image
                source={profileImage
                  ? { uri: `data:image/png;base64,${profileImage}` }
                  : require('../assets/icon.png')}
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
                <Text key={item.uid}>{calculateDdayText(item.end_at, item.title)}  </Text>
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
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                  />
                  <Text style={styles.modalText}>슬로건</Text>
                  <TextInput
                    value={slogan}
                    onChangeText={setSlogan}
                    style={styles.input}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button title="취소" onPress={() => setShowProfileEdit(false)} />
                    <Button
                      title="저장"
                      onPress={async () => {
                        try {
                          await updateUserInfo({ nickname: name, slogan });
                          Alert.alert("프로필이 성공적으로 수정되었습니다.");
                          setShowProfileEdit(false);
                        } catch (err) {
                          console.error("프로필 업데이트 실패:", err);
                          Alert.alert("프로필 수정 실패", "서버 오류가 발생했습니다.");
                        }
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

                  {ddayItems && (
                    <Text style={{ textAlign: 'center', marginVertical: 10 }}>삭제할 항목이 없습니다.</Text>
                  )}

                  {ddayItems.map((item) => (
                    <View key={item.uid} style={styles.ddayRow}>
                      <Text style={{ flex: 1 }}>{item.title}</Text>
                      <Button
                        title="삭제"
                        onPress={async () => {
                          try {
                            await deleteDday(item.uid);
                            setDdayItems(prev => prev.filter(dday => dday.uid !== item.uid)); // 로컬 상태 갱신
                          } catch (err) {
                            console.log("디데이 삭제 실패: ", err)
                          }
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
                    <Button title="추가" onPress={async () => {
                      if (!ddayTitle.trim() || !ddayDate.trim()) return;

                      try {
                        await postDday({ title: ddayTitle, end_at: ddayDate });

                        const text = calculateDdayText(ddayDate, ddayTitle);
                        const newItem = {
                          id: Date.now(),
                          text
                        };

                        setDdayItems(prev => [...prev, newItem]);
                        setDdayTitle('');
                        setDdayDate('');
                        setShowDdayAddModal(false);
                      } catch (err) {
                        console.error("D-day 추가 실패:", err);
                      }
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
      </ScrollView>
      <BottomNav />
    </View >
  );
}