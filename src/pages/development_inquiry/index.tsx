import {
  Button,
  FormControl,
  FormControlLabel,
  makeStyles,
  TextareaAutosize,
} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import axios from 'axios'
import {useState} from 'react'
import {ORDER_PROJECT, UPLOAD_fILES} from '../../apis/urlConfig'
import InputBase from '../../components/input'
import CustomizedSnackbars from '../../components/snackbar'
import UploadFile from '../../components/upload_file'
import {BASE_URL} from '../../constants'
import {OrderProjectType} from '../../types/orderProject.type'

const useStyles = makeStyles({
  container_development_inquiry: {
    background: '#F9FAFB',
    paddingBottom: '40px',
    '&>div:nth-child(1)': {
      background: 'black',
      height: '120px',
    },
    '&>div:nth-child(2)': {
      margin: '60px auto 0',
      width: '50%',
      padding: '32px 40px',
      background: '#FFFFFF',
      boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',
      borderRadius: '6px',
      '&>p': {
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '36px',
      },
      '&>div': {
        display: 'flex',
        '&>label': {
          display: 'inline-block',
          marginBottom: '10px',
          marginTop: '10px',
          fontWeight: '500',
          fontSize: '18px',
          lineHeight: '27px',
          color: '#1F293',
        },
        '&>p': {
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '27px',
          color: '#1F2937',
        },
        '& .MuiFormControlLabel-label': {
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#6B7280',
        },
      },
      '&>button': {
        width: '100%',
        height: '48px',
        borderRadius: '5px',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '24px',
        margin: '32px 0',
      },
      '&>span': {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        textAlign: 'center',
        color: '#6B7280',
        display: 'block',
        '&>span': {
          color: '#2C97EB',
        },
      },
    },
  },
  '@media (max-width: 740px)': {
    container_development_inquiry: {
      background: '#F9FAFB',
      paddingBottom: '40px',
      '&>div:nth-child(1)': {
        background: 'black',
        height: '120px',
      },
      '&>div:nth-child(2)': {
        margin: '16px auto 0',
        width: '85%',
        padding: '8px 16px',
        background: '#FFFFFF',
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',
        borderRadius: '6px',
        '&>p': {
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '30px',
          textAlign: 'center',
        },
        '&>div': {
          display: 'inherit',
          '&>label': {
            display: 'inline-block',
            marginBottom: '10px',
            marginTop: '10px',
            fontWeight: '500',
            fontSize: '18px',
            lineHeight: '27px',
            color: '#1F293',
          },
          '&>p': {
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
            color: '#1F2937',
          },
          '& .MuiFormControlLabel-label': {
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '24px',
            color: '#6B7280',
          },
        },
        '&>button': {
          width: '100%',
          height: '48px',
          borderRadius: '5px',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '24px',
          margin: '32px 0',
        },
        '&>span': {
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          textAlign: 'center',
          color: '#6B7280',
          display: 'block',
          '&>span': {
            color: '#2C97EB',
          },
        },
      },
    },
  },
})

const DevelopmentInquiry = () => {
  const classes = useStyles()
  const [data, setData] = useState<OrderProjectType>({
    platform: 'NOTHING',
    companyName: '',
    customerName: '',
    email: '',
    governmentSupport: false,
    phone: '',
    position: '',
    projectName: '',
    description: '',
    presenter: '',
    planFile: [],
  })
  const [snackbar, setSnackbar] = useState<{
    content: string
    type?: 'error' | 'warning' | 'success' | 'info'
  }>({content: ''})
  const [open, setOpen] = useState<boolean>(false)

  const handleCreateOrderProject = async () => {
    const formdataFile = new FormData()
    data.planFile?.forEach((item) => {
      formdataFile.append('files', item)
    })
    const resUploadFiles = await axios.post(
      `${BASE_URL}${UPLOAD_fILES}`,
      formdataFile
    )
    const res = await axios.post(`${BASE_URL}${ORDER_PROJECT}`, {
      ...data,
      planFile: resUploadFiles.data.data,
    })
    if (res.data.code === 0) {
      setOpen(true)
      setSnackbar({content: 'success', type: 'success'})
      resetForm()
    } else {
      setOpen(true)
      setSnackbar({
        content: `${res.data.errors[0].rule} ????????? ??????`,
        type: 'error',
      })
    }
  }
  const resetForm = () => {
    setData({
      platform: 'NOTHING',
      companyName: '',
      customerName: '',
      email: '',
      governmentSupport: false,
      phone: '',
      position: '',
      projectName: '',
      description: '',
      presenter: '',
      planFile: [],
      maximumBudget: 0,
    })
  }

  return (
    <div className={classes.container_development_inquiry}>
      <div></div>
      <div>
        <p>?????? ??????</p>
        <div>
          <InputBase
            placeholder='???????????????'
            label='???????????????'
            value={data.projectName}
            onChange={(e) => setData({...data, projectName: e})}
            require
          />
        </div>
        <div>
          <UploadFile
            label='???????????????'
            placeholder='?????? ?????? (.pdf, .csv)'
            setFile={(e) => setData({...data, planFile: e})}
            file={data.planFile as any[]}
          />
        </div>
        <div style={{display: 'inherit'}}>
          <label htmlFor='textarea'>???????????? ?????? ??????</label>
          <br />
          <TextareaAutosize
            aria-label='minimum height'
            minRows={3}
            id='textarea'
            placeholder='???: ???????????? ????????? ????????? ?????? ?????????'
            style={{
              width: '100%',
              paddingLeft: '10px',
              height: '144px',
              boxSizing: 'border-box',
            }}
            value={data.description}
            onChange={(e) => setData({...data, description: e.target.value})}
          />
        </div>
        <div>
          <InputBase
            value={data.maximumBudget}
            onChange={(e) => setData({...data, maximumBudget: Number(e)})}
            placeholder='?????? ??????'
            label='?????? ??????'
            type='number'
            require
          />
        </div>
        <div>
          <InputBase
            onChange={() => console.log(11)}
            placeholder='???: ????????????????????? ?????????'
            label='?????????????????? ?????? ??????'
          />
        </div>
        <FormControl>
          <p>?????? ?????????</p>
          <FormGroup style={{display: 'flex'}}>
            <FormControlLabel
              control={<Checkbox />}
              label='????????????(???????????????)'
              checked={
                data.platform === 'MOBILE_APP' || data.platform === 'BOTH'
                  ? true
                  : false
              }
              onChange={() => {
                switch (data.platform) {
                  case 'NOTHING':
                    setData({...data, platform: 'MOBILE_APP'})
                    break
                  case 'BOTH': {
                    setData({...data, platform: 'WEB_APP'})
                    break
                  }
                  case 'WEB_APP': {
                    setData({...data, platform: 'BOTH'})
                    break
                  }
                  case 'MOBILE_APP': {
                    setData({...data, platform: 'NOTHING'})
                    break
                  }
                  default:
                    break
                }
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label='????????????'
              checked={
                data.platform === 'WEB_APP' || data.platform === 'BOTH'
                  ? true
                  : false
              }
              onChange={() => {
                switch (data.platform) {
                  case 'NOTHING':
                    setData({...data, platform: 'WEB_APP'})
                    break
                  case 'BOTH': {
                    setData({...data, platform: 'MOBILE_APP'})
                    break
                  }
                  case 'WEB_APP': {
                    setData({...data, platform: 'NOTHING'})
                    break
                  }
                  case 'MOBILE_APP': {
                    setData({...data, platform: 'BOTH'})
                    break
                  }
                  default:
                    break
                }
              }}
            />
          </FormGroup>
        </FormControl>
        <div>
          <InputBase
            onChange={(e) => setData({...data, customerName: e})}
            value={data.customerName}
            placeholder='????????? ?????? ???????????????'
            label='??????'
            require
          />
        </div>
        <div>
          <InputBase
            onChange={(e) => setData({...data, companyName: e})}
            value={data.companyName}
            placeholder='???????????????'
            label='???????????? '
            require
          />
          <div style={{width: '32px'}}></div>
          <InputBase
            onChange={(e) => setData({...data, position: e})}
            value={data.position}
            placeholder='????????? ???????????????'
            label='??????'
            require
          />
        </div>
        <div>
          <InputBase
            onChange={(e) => setData({...data, email: e})}
            value={data.email}
            placeholder='???????????? ???????????????'
            label='?????????'
            require
          />
          <div style={{width: '32px'}}></div>
          <InputBase
            onChange={(e) => setData({...data, phone: e})}
            value={data.phone}
            placeholder='??????????????? ??????????????? '
            label='???????????????(???????????????)'
            require
          />
        </div>
        <div>
          <InputBase
            onChange={(e) => setData({...data, presenter: e})}
            value={data.presenter}
            placeholder='?????? ????????? '
            label='????????? ?????? ??????????????? ?????? ??? ??????'
            require
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          onClick={handleCreateOrderProject}
          disabled={
            !data.projectName ||
            !data.maximumBudget ||
            !data.customerName ||
            !data.companyName ||
            !data.position ||
            !data.email ||
            !data.presenter ||
            !data.phone ||
            !data.platform
              ? true
              : false
          }
        >
          ????????????
        </Button>
        <span>
          ??????????????? ????????? <span>??????????????????</span> ??? ????????? ????????? ?????????
        </span>
      </div>
      <CustomizedSnackbars
        {...snackbar}
        open={open}
        setOpen={() => setOpen(false)}
      />
    </div>
  )
}

export default DevelopmentInquiry
