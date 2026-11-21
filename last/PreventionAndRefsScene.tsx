import React from 'react';
import {C, Card, Heading, Scene, useIn, useSpring} from './ui';

const TIPS = ['Move 150 minutes a week', 'Eat more whole foods', 'Lose 5 to 7% of body weight if you carry extra'];
const REFS: Array<[string, string]> = [
  ['WHO: Diabetes fact sheet', 'who.int/news-room/fact-sheets/detail/diabetes'],
  ['NICE: Preventing type 2 diabetes (PH38)', 'nice.org.uk/guidance/ph38'],
  ['IDF Diabetes Atlas', 'diabetesatlas.org'],
  ['NHS: Type 2 diabetes', 'nhs.uk/conditions/type-2-diabetes'],
];

const Tip: React.FC<{text: string; i: number}> = ({text, i}) => {
  const s = useSpring(16 + i * 8, 8);
  return (
    <Card delay={10 + i * 8} from="left" style={{display: 'flex', alignItems: 'center', gap: 22, padding: 24}}>
      <div style={{width: 56, height: 56, borderRadius: 28, background: C.green, color: '#fff', fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${Math.max(0, s)})`}}>{i + 1}</div>
      <div style={{fontSize: 36, fontWeight: 700, lineHeight: 1.2}}>{text}</div>
    </Card>
  );
};

const Ref: React.FC<{name: string; url: string; i: number}> = ({name, url, i}) => (
  <div style={useIn(40 + i * 7, 'right')}>
    <div style={{fontSize: 28, fontWeight: 700}}>{name}</div>
    <div style={{fontSize: 22, color: C.sub}}>{url}</div>
  </div>
);

export const PreventionAndRefsScene: React.FC = () => (
  <Scene caption="Not medical advice. Talk to your doctor.">
    <Heading>Good news: you can lower your risk.</Heading>
    <div style={{flex: 1, minHeight: 0, display: 'flex', gap: 36}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 22, justifyContent: 'center'}}>
        {TIPS.map((t, i) => <Tip key={t} text={t} i={i} />)}
      </div>
      <Card delay={30} from="right" style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16}}>
        <div style={{fontSize: 38, fontWeight: 800, color: C.teal}}>References</div>
        {REFS.map(([n, u], i) => <Ref key={n} name={n} url={u} i={i} />)}
      </Card>
    </div>
  </Scene>
);
