import React, { useState } from 'react';
const [note, setNote] = useState('');


const unit = ACTIVITIES.find(a => a.key === selected)?.unit || 'pz';


const inc = (d=1) => setQty(q => String(Math.max(0, Number(q||'0') + d)));
const dec = (d=1) => setQty(q => String(Math.max(0, Number(q||'0') - d)));


function save() {
if (!openShift) { Alert.alert('Timbra prima', 'Devi essere in turno per registrare attività.'); return; }
addWork(selected, Number(qty||'0'), unit, note || undefined);
setQty('0'); setNote('');
Alert.alert('Salvato', 'Attività registrata.');
}


return (
<Screen>
<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
{ACTIVITIES.map(a => (
<TouchableOpacity key={a.key} onPress={() => setSelected(a.key)} style={{ backgroundColor: selected === a.key ? '#2563eb' : '#111827', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, margin: 4 }}>
<Text style={{ color: 'white', fontWeight: '700' }}>{a.label}</Text>
</TouchableOpacity>
))}
</View>


<Card>
<Text style={{ color: 'white', marginBottom: 8 }}>Quantità ({unit})</Text>
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
<SmallBtn text="-" onPress={() => dec(1)} />
<TextInput value={qty} onChangeText={setQty} keyboardType="numeric" style={{ color: 'white', backgroundColor: '#1f2937', padding: 12, borderRadius: 10, minWidth: 100, textAlign: 'center', fontSize: 18 }} />
<SmallBtn text="+" onPress={() => inc(1)} />
</View>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
<SmallBtn text="+5" onPress={() => inc(5)} />
<SmallBtn text="+10" onPress={() => inc(10)} />
<SmallBtn text="+50" onPress={() => inc(50)} />
</View>
</Card>


<Card>
<Text style={{ color: 'white', marginBottom: 8 }}>Nota (opzionale)</Text>
<TextInput value={note} onChangeText={setNote} placeholder="Es. stanza 3, parete nord" placeholderTextColor="#9ca3af" style={{ color: 'white', backgroundColor: '#1f2937', padding: 12, borderRadius: 10 }} />
</Card>


<BigButton label="Salva attività" onPress={save} color="#10b981" />
</Screen>
);
}


function SmallBtn({ text, onPress }: { text: string; onPress: () => void }) {
return (
<TouchableOpacity onPress={onPress} style={{ backgroundColor: '#1f2937', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 }}>
<Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{text}</Text>
</TouchableOpacity>
);
}