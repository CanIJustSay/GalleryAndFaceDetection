import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			permissionGranted: null,
			image: null,
		};
	}
	pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
      if(!result.cancelled){
        this.setState({
          image: result.data,
        })
      }
		} catch (err) {
			console.log(err.message);
		}
	};
	getCameraPerm = async () => {
		const { status } = await Permission.askAsync(Permission.CAMERA);
		if (status !== "granted") {
			Alert.alert("You must approve camera permissions to proceed.");
		}
		this.setState({
			permissionGranted: status === "granted" ? true : false,
		});
		if (this.state.permissionGranted) {
			this.pickImage();
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						this.getCameraPerm();
					}}
				>
					<Text style={styles.text}>Open Gallery</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		borderWidth: 2,
		width: 200,
		height: 40,
		borderRadius: 20,
		alignSelf: "center",
		justifyContent: "center",
		textAlign: "center",
	},
	text: {
		alignSelf: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
});
