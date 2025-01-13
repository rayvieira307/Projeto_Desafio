import { TextInput, TouchableOpacity, View } from "react-native";
import { styles } from './style';
import Icon from '@expo/vector-icons/Feather';
import { useState } from "react";

interface PropsInput {
  placeHolder: string;
  valueInput: string;
  hadleFunctionInput: (value: string) => void;
  typeIcon?: string; 
}

export const TextInputField = ({
  placeHolder,
  valueInput,
  hadleFunctionInput,
  typeIcon
}: PropsInput) => {

  const [viewPassword, setViewPassword] = useState<boolean>(false);

  return (
    <View style={styles.boxInput}>
      <TextInput
        onChangeText={hadleFunctionInput}
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor="#000"
        secureTextEntry={typeIcon === 'password' && !viewPassword} 
        value={valueInput}
      />

      <View style={styles.boxIcon}>
        {typeIcon === 'person' && 
          <Icon name="user" size={24} color="#000" />
        }

        {typeIcon === 'password' && 
          <TouchableOpacity onPress={() => setViewPassword(!viewPassword)}>
            {viewPassword ? (
              <Icon name="eye" size={24} color="#000" />
            ) : (
              <Icon name="eye-off" size={24} color="#000" />
            )}
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}
