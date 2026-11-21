import React from 'react';
import {C, Card, Heading, Scene} from './ui';

const TIPS = ['Move 150 minutes a week', 'Eat more whole foods', 'Lose 5 to 7% of body weight if you carry extra'];
const REFS: Array<[string, string]> = [
  ['Prediabetes Risk Test', 'cdc.gov/diabetes/risk-test'],
  ['Diabetes Prevention Program', 'niddk.nih.gov (DPP)'],
  ['NIH / PubMed Central', 'ncbi.nlm.nih.gov/pmc/articles/PMC1282458'],
  ['Mayo Clinic: Prediabetes', 'mayoclinic.org/diseases-conditions/prediabetes'],
];

export const PreventionAndRefsScene: React.FC = () => (
  <Scene caption="Not medical advice. Talk to your doctor.">
    <Heading>Good news: you can lower your risk.</Heading>
    <div style={{flex: 1, display: 'flex', gap: 40, minHeight: 0}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center'}}>
        {TIPS.map((t, i) => (
          <Card key={t} delay={10 + i * 8} style={{display: 'flex', alignItems: 'center', gap: 22, padding: 26}}>
            <div style={{width: 56, height: 56, borderRadius: 28, background: C.green, color: '#fff', fontSize: 34, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
            <div style={{fontSize: 38, fontWeight: 700, lineHeight: 1.2}}>{t}</div>
          </Card>
        ))}
      </div>
      <Card delay={30} style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18}}>
        <div style={{fontSize: 40, fontWeight: 800, color: C.teal}}>References</div>
        {REFS.map(([name, url]) => (
          <div key={name}>
            <div style={{fontSize: 30, fontWeight: 700}}>{name}</div>
            <div style={{fontSize: 24, color: C.sub}}>{url}</div>
          </div>
        ))}
      </Card>
    </div>
  </Scene>
);
