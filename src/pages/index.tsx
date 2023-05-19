import ArrowDown from "@/ArrowDown";
import { Button, Group, Input, Modal, Table, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [full, setFull] = useState("");
  const [date, setDate] = useState("");
  const [reas, setReas] = useState("");
  const [addres, setAddres] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      IsmFamiliya: full,
      Sana: date,
      Address: addres,
      KasallikSababi: reas,
    };
    axios
      .post(
        "https://sheet.best/api/sheets/01ff3c0c-fc53-4627-a820-4352213546e9",
        data
      )
      .then((res) => {
        setFull(""), setDate(""), setAddres(""), setReas("");
      });
    console.log(data);
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-screen flex items-center justify-center">
      <div>
        <Modal
          opened={opened}
          onClose={close}
          title="Royxatga qo'shish"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextInput
            placeholder="Sizning ismi familiyasi"
            label="Ismi Familiyasi"
            variant="filled"
            mt={10}
            onChange={(e) => setFull(e.target.value)}
            value={full}
            required
          />
          <Input.Wrapper label="Tug'ilgan sanasi" mt={20}>
            <Input
              placeholder="Sizning tug'ilgan sanangiz"
              type="date"
              variant="filled"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </Input.Wrapper>
          <TextInput
            placeholder="Joylashuvnu kiriting"
            label="Manzil"
            variant="filled"
            mt={10}
            onChange={(e) => setAddres(e.target.value)}
            value={addres}
            required
          />
          <TextInput
            placeholder="Kasallik haqida"
            label="Kasallik turi"
            variant="filled"
            mt={10}
            onChange={(e) => setReas(e.target.value)}
            value={reas}
            required
          />
          <Group>
            <Button
              className="font-medium px-3 rounded-xl bg-blue-400 text-white ml-80 my-5"
              onClick={(e) => handleSubmit(e)}
            >
              Jonatish
            </Button>
          </Group>
        </Modal>
        <div className="container mx-auto px-10 lg:w-[900px]">
          <div className="flex items-center justify-between">
            <Link href={"/"} className="font-bold text-3xl">
              Reg
            </Link>
            <Group>
              <Button
                className="font-medium text-xl px-4 rounded-xl bg-blue-400 text-white"
                onClick={open}
              >
                + Ro&apos;yxatga qo&apos;shish
              </Button>
            </Group>
          </div>
        </div>
        <div className="container mx-auto px-16 text-center">
          <h1 className="font-semibold text-2xl text-center mt-10 lg:mt-16 text-white">
            Malumotlarni ko&apos;rish uchun bosing
          </h1>
          <div>
            <ArrowDown />
          </div>
          <Link
            href={
              "https://docs.google.com/spreadsheets/d/15q4JwVOj1ouMgkZMKbhllVRez69eCTjIDy0w6e8cI2U/edit?usp=sharing"
            }
            className="text-2xl font-bold w-full"
          >
            <div className="cursor-pointer">Ko&apos;rish</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
