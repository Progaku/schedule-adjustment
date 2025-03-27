"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Container,
  HStack,
  useColorMode,
} from "@yamada-ui/react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="container.md" py={8}>
      <VStack align="stretch">
        <Heading as="h1" size="xl">
          Yamada UI テスト
        </Heading>

        <Box p={6} bg="gray.100" rounded="md">
          <Text fontSize="lg">これはYamada UIのテストです</Text>
        </Box>
        <Box p="md">
          <Heading>カラーモードの切り替え</Heading>
          <Button onClick={toggleColorMode} mt="md">
            {colorMode === "light"
              ? "ダークモードに切り替え"
              : "ライトモードに切り替え"}
          </Button>
          <Box mt="md">
            現在のモード: {colorMode === "light" ? "ライト" : "ダーク"}
          </Box>
        </Box>

        <HStack>
          <Button colorScheme="blue">ボタン</Button>
          <Button colorScheme="green" variant="outline">
            アウトライン
          </Button>
        </HStack>
      </VStack>
      <div className="bg-green-300">Tailwindcssテスト</div>
    </Container>
  );
}
