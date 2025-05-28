import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Image, Paragraph, XStack } from "tamagui";
type ProdutosProps = {
  nomeProduto: string;
  qntGramas: number;
  valorProduto: number;
};

const Produtos: FC<ProdutosProps> = ({
  nomeProduto,
  qntGramas,
  valorProduto,
}) => {
  return (
    <Card
      elevate
      size="$1"
      bordered
      width={150}
      height={200}
      display="flex"
      gap={10}
      backgroundColor="#fff"
      borderRadius={10}
    >
      <Card.Footer
        padded
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <XStack flex={1} />
        <View style={styles.descricaoProduto}>
          <Paragraph theme="alt2" fontWeight={800}>
            {nomeProduto}
          </Paragraph>
          <Paragraph theme="alt2" fontWeight={300}>
            {qntGramas} (g)
          </Paragraph>
        </View>
        <View style={styles.descricaoProduto}>
          <Paragraph theme="alt2" color="#4e9d77" fontWeight={800}>
            {valorProduto}
          </Paragraph>
        </View>
      </Card.Footer>
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 100,
            height: 100,
            uri: require("@/src/assets/images/mercado.jpg"),
          }}
        />
      </Card.Background>
    </Card>
  );
};

export default Produtos;

const styles = StyleSheet.create({
  descricaoProduto: {
    display: "flex",
    flexDirection: "column",
  },
});
