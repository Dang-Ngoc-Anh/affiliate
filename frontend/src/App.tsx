import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Input, Card, message, Spin, Progress, Steps } from 'antd';
import { VideoCameraOutlined, ProjectOutlined, SettingOutlined, RobotOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (jobId) {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`http://localhost:3000/workflow/status/${jobId}`);
          setProgress(res.data.progress || 0);
          setStatus(res.data.status);

          if (res.data.status === 'completed') {
            setResult(res.data.result);
            setLoading(false);
            setJobId(null);
            clearInterval(interval);
            message.success('Video Generated Successfully!');
          } else if (res.data.status === 'failed') {
            setLoading(false);
            setJobId(null);
            clearInterval(interval);
            message.error('Job Failed!');
          }
        } catch (e) {
          console.error(e);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [jobId]);

  const generateContent = async () => {
    if (!topic || !productInfo) {
      message.error('Please enter topic and product info');
      return;
    }
    setLoading(true);
    setProgress(0);
    setResult(null);
    try {
      const res = await axios.post('http://localhost:3000/workflow/start', {
        topic,
        productInfo
      });
      setJobId(res.data.jobId);
      message.info('Workflow started!');
    } catch (error) {
      message.error('Failed to start workflow');
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
          AI FACTORY
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={[
          { key: '1', icon: <RobotOutlined />, label: 'AI Generator' },
          { key: '2', icon: <ProjectOutlined />, label: 'Projects' },
          { key: '3', icon: <VideoCameraOutlined />, label: 'Videos' },
          { key: '4', icon: <SettingOutlined />, label: 'Settings' },
        ]} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: 8 }}>
            <Title level={2}>TikTok Video Factory (Local AI)</Title>
            <Paragraph>Automated pipeline: Qwen2.5 (Script) → GPT-SoVITS (Voice) → ComfyUI (Images) → FFmpeg (Video)</Paragraph>
            
            <Card title="Input Requirements" style={{ maxWidth: 800, marginBottom: 20 }}>
              <Input 
                placeholder="Enter Topic (e.g., Gaming Mouse Review)" 
                value={topic}
                onChange={e => setTopic(e.target.value)}
                style={{ marginBottom: 16 }}
              />
              <TextArea 
                placeholder="Enter Product Info (e.g., Logitech G102, cheap, RGB...)" 
                rows={4}
                value={productInfo}
                onChange={e => setProductInfo(e.target.value)}
                style={{ marginBottom: 16 }}
              />
              <Button type="primary" size="large" icon={<RobotOutlined />} onClick={generateContent} loading={loading}>
                Generate Full Video
              </Button>
            </Card>

            {(loading || progress > 0) && (
              <Card style={{ maxWidth: 800, marginBottom: 20 }}>
                <Steps
                  current={progress < 20 ? 0 : progress < 50 ? 1 : progress < 70 ? 2 : 3}
                  items={[
                    { title: 'Script (Qwen)', description: 'Writing hook...' },
                    { title: 'Voice (SoVITS)', description: 'Cloning voice...' },
                    { title: 'Images (ComfyUI)', description: 'Generating...' },
                    { title: 'Video (FFmpeg)', description: 'Assembling...' },
                  ]}
                />
                <Progress percent={progress} status="active" style={{ marginTop: 20 }} />
              </Card>
            )}

            {result && (
              <Card title="Final Output" style={{ maxWidth: 800, marginTop: 20, borderColor: '#52c41a' }}>
                <Title level={4}>🎬 Generated Video Path</Title>
                <Paragraph code>{result.videoPath}</Paragraph>
                
                <Title level={4}>🪝 Hook (Generated by Qwen)</Title>
                <Paragraph style={{ fontSize: 16, fontWeight: 'bold' }}>{result.script.hook}</Paragraph>
                
                <Title level={4}>📝 Full Script</Title>
                <Paragraph style={{ whiteSpace: 'pre-line' }}>{result.script.content}</Paragraph>
              </Card>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
