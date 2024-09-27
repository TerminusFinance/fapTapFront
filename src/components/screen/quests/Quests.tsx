import React, {useState} from "react";
import IcQuestsHeader from "../../../assets/icon/ic_quest-header.svg";
import {HorizontalSelector} from "../../otherViews/selectors/HorizontalSelector.tsx";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import {useNavigate} from "react-router-dom";
import {ItemElementsImprove} from "../../otherViews/itemElements/ItemElementsImprove.tsx";
import {useData} from "../../otherViews/DataContext.tsx";
import {ModalQuestsMulti} from "../../modal/modalDeleteAccount/ModalQuests.tsx";
import {checkSuccessTask, UserTask} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {isOpenUrlTask, IsStockReg} from "./typeQuests.ts";
import {useToast} from "../../otherViews/toast/ToastContext.tsx";
import {ButtonMulti} from "../../otherViews/buttons/ButtonMulti.tsx";
import {OpenUrl, useTelegramBackButton} from "../../../core/Utils.ts";

export const QuestsScreen: React.FC = () => {

    const {dataApp, setDataApp} = useData();
    const [tabSelected, setTabSelected] = useState<string>("Task");
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<UserTask | null>(null);
    const [visitTask, setVisitTask] = useState<boolean>(false);

    try {
        useTelegramBackButton(true)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }

    const {showToast} = useToast();

    const handleShowToast = (message: string, type: 'success' | 'error' | 'info') => {
        showToast(message, type);
    };

    const handleTabSelect = (selectedTab: string) => {
        console.log(`Selected tab: ${tabSelected}`);
        setTabSelected(selectedTab)
    };

    const openBottomSheet = (task: UserTask) => {
        if (!task.completed) {
            setSelectedTask(task);
            setBottomSheetVisible(true);
        }
    };

    const closeBottomSheet = () => {
        setTaskStates({})
        setBottomSheetVisible(false);
        setVisitTask(false)
    };


    const navigate = useNavigate();

    const handleNav = (marsh: string) => {
        navigate(`/${marsh}`);
    };

    // Создание состояния для хранения статусов задач
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [taskStates, setTaskStates] = useState<Record<number, {
        isLoading: boolean;
        checkResult: boolean | null;
        errorMessage: string | null;
    }>>({})

    const updateTaskState = (taskId: number, newState: Partial<typeof taskStates[number]>) => {
        setTaskStates(prevStates => ({
            ...prevStates,
            [taskId]: {
                ...prevStates[taskId],
                ...newState,
            }
        }));
    };

    const checkTask = async () => {
        const SselectedTask = selectedTask;
        if (SselectedTask != undefined) {
            try {
                updateTaskState(SselectedTask.taskId, {isLoading: true});
                const requestToCheck = await checkSuccessTask(SselectedTask.taskId)
                if (typeof requestToCheck === 'object') {
                    setDataApp(prevState =>({
                        ...prevState,
                        tasks: requestToCheck.tasks
                    }))
                    // setDataApp(requestToCheck);
                    if (IsStockReg(SselectedTask.taskType)) {
                        if (SselectedTask.etaps == 0 || SselectedTask.etaps == 2) {
                            handleShowToast("Your task has been sent for verification", 'info')
                        } else {
                            handleShowToast("The checking was successful", 'success')
                        }
                    } else if (isOpenUrlTask(SselectedTask.taskType)) {
                        if (SselectedTask.etaps == 0 || SselectedTask.etaps == 2) {
                            handleShowToast("Your task has been sent for verification", 'info')
                        } else {
                            handleShowToast("The checking was successful", 'success')
                        }
                    } else {
                        handleShowToast("The checking was successful", 'success')
                    }
                    closeBottomSheet()
                } else {
                    handleShowToast("You didn't fulfil the conditions ", 'error')
                }
            } catch (e) {
                console.log(e)
                handleShowToast("You didn't fulfil the conditions ", 'error')
            } finally {
                updateTaskState(SselectedTask.taskId, {isLoading: false});
            }

        }
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            maxHeight: '100vh',
            background: '#131418',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
        }}>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                // height: '100%',
                overflowY: 'auto',
            }}>



            <div style={{
                width: 390,
                height: 345,
                paddingBottom: 173,
                paddingLeft: 34,
                paddingRight: 34,
                left: 0,
                top: 0,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'inline-flex'
            }}>
                <div style={{
                    width: 322,
                    height: 90,
                    background: 'linear-gradient(180deg, #B3ACFC 0%, #584CF4 100%)',
                    boxShadow: '0px 0px 200px rgba(0, 0, 0, 0.25)',
                    borderRadius: '50%',
                    filter: 'blur(200px)',
                    zIndex: 0
                }}/>
            </div>


            <img src={IcQuestsHeader} style={{
                width: '100px',
                height: '100px',
                marginBottom: '8px',
                marginTop: '32px'
            }}/>

            <span style={{
                fontFamily: 'UbuntuBold',
                color: '#F0EFFB',
                fontSize: '24px',
                marginBottom: '8px'
            }}>
                Task
            </span>

            <span style={{
                fontSize: '16px',
                fontFamily: 'UbuntuRegular',
                color: '#B5B7B9'
            }}>
                Earn More Money
            </span>
            <div style={{
                width: '100%',
                boxSizing: 'border-box',
                paddingRight: '16px',
                paddingLeft: '16px',
                marginTop: '24px'
            }}>
                <HorizontalSelector tabs={["Task", "Quests", "Maker"]} onTabSelect={handleTabSelect}/>

                {tabSelected === "Task" && (
                    <div style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        paddingRight: '16px',
                        paddingLeft: '16px',
                    }}>
                        {dataApp.tasks.map((item) => {


                            if (item.completed) {
                                return null;
                            }

                            return (
                                <ItemElementsImprove
                                    key={item.taskId}
                                    title={item.text}
                                    handleClick={() => openBottomSheet(item)}
                                    itemUpgrate={item.rewards ? item.rewards : null}
                                    img={""}
                                    onLoading={item.etaps === 1 || item.etaps === 3}
                                />
                            )

                        })}
                    </div>
                )}

            </div>
            </div>

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#131418',
            }}>

                <div style={{height: '16px'}}/>
                <NavigationBar
                    initialSelected={"Quest"}
                    onFriendsClick={() => handleNav("friends")}
                    onFapClick={() => handleNav('fap')}
                    onQuestClick={() => {
                    }}
                    onTopClick={() => handleNav('top')}
                    onImproveClick={() => handleNav('improve')}
                />
            </div>

            {selectedTask && (
                <ModalQuestsMulti isVisible={isBottomSheetVisible}
                                  onClose={closeBottomSheet}
                                  img={selectedTask.checkIcon}
                                  title={selectedTask.text}
                                  description={selectedTask.txDescription}
                                  reward={selectedTask.rewards != null ? selectedTask.rewards[0] : null}
                                  content={
                                      <div style={{
                                          width: '100%',
                                          boxSizing: 'border-box',
                                          marginLeft: '16px',
                                          marginRight: '16px'
                                      }}>
                                          <ButtonMulti
                                              tx={visitTask ? taskStates[selectedTask.taskId]?.isLoading ? 'Checking' : 'Check Task' : 'Complete Task'}
                                              onClick={() => {
                                                  if (visitTask) {
                                                      checkTask()
                                                  } else {
                                                      if (selectedTask?.taskType != undefined) {
                                                          if (isOpenUrlTask(selectedTask.taskType)) {
                                                              OpenUrl(selectedTask.taskType.url)
                                                          }
                                                      }
                                                      setVisitTask(true)
                                                  }
                                              }}
                                              bgClr={visitTask ? taskStates[selectedTask.taskId]?.isLoading ? '#252830' : "#F44C54" : '#584CF4'}
                                              onLoading={taskStates[selectedTask.taskId]?.isLoading}/>
                                      </div>
                                  }
                />
            )}

        </div>
    )
}