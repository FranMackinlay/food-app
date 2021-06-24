import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Button } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react"


export default function Home() {
  return (
    <div className={styles.container}>
      <chakra.h1 mb={10}>Welcome!</chakra.h1>
      <Link href="/mainScreen/mainScreen" passHref>
        <Button colorScheme="teal" variant="solid">
          Go to Main Screen
        </Button>
      </Link>
    </div>
  )
}
