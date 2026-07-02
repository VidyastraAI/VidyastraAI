"""
vision.py

Vision Module

Features
--------
1. OCR Extraction
2. Vision Understanding
3. Slide Classification
4. Key Concept Extraction
5. Frame Analysis
6. Batch Processing
7. Memory Cleanup

Models
-------
OCR  : PaddleOCR 3.2
VLM  : Qwen2.5-VL-3B-Instruct
"""

import gc
import json
import os

from PIL import Image

import torch

from paddleocr import PaddleOCR

from transformers import (
    AutoProcessor,
    Qwen2_5_VLForConditionalGeneration
)


class VisionAnalyzer:

    def __init__(self):

        print("Loading OCR...")

        self.ocr = PaddleOCR(
            lang="en",
            use_doc_orientation_classify=False,
            use_doc_unwarping=False,
            use_textline_orientation=False
        )

        print("Loading Qwen2.5-VL...")

        self.model_name = "Qwen/Qwen2.5-VL-3B-Instruct"

        self.processor = AutoProcessor.from_pretrained(
            self.model_name
        )

        self.model = (
            Qwen2_5_VLForConditionalGeneration.from_pretrained(
                self.model_name,
                torch_dtype="auto",
                device_map="auto"
            )
        )

    ####################################################################
    # OCR
    ####################################################################

    def extract_text(
        self,
        image_path
    ):

        try:

            result = self.ocr.predict(
                image_path
            )

            texts = []

            for page in result:

                if hasattr(
                    page,
                    "rec_texts"
                ):

                    texts.extend(
                        page.rec_texts
                    )

            return "\n".join(
                texts
            )

        except Exception as e:

            print(
                "OCR Error:",
                e
            )

            return ""

    ####################################################################
    # Content Classification
    ####################################################################

    def classify_content(
        self,
        ocr_text
    ):

        text = ocr_text.lower()

        if (
            "class" in text
            and
            "public" in text
        ):
            return "Code"

        if (
            "select"
            in text
            or
            "create table"
            in text
        ):
            return "SQL"

        if (
            "table"
            in text
        ):
            return "Table"

        if (
            "algorithm"
            in text
        ):
            return "Algorithm"

        if (
            "database"
            in text
        ):
            return "Lecture Slide"

        return "Unknown"

    ####################################################################
    # Vision LLM
    ####################################################################

    def analyze_image(
        self,
        image_path
    ):

        image = Image.open(
            image_path
        ).convert(
            "RGB"
        )

        prompt = """
You are an expert university professor.

Analyze the lecture slide.

Return ONLY:

1. Slide Type

2. Main Topic

3. Important Concepts

4. Summary

5. Quiz Questions

Keep the answer concise.
"""

        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "image": image
                    },
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ]

        text = self.processor.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )

        inputs = self.processor(
            text=[text],
            images=[image],
            return_tensors="pt"
        )

        inputs = {
            k: v.to(
                self.model.device
            )
            for k, v in inputs.items()
        }

        with torch.no_grad():

            output_ids = self.model.generate(
                **inputs,
                max_new_tokens=256,
                do_sample=False
            )

        generated_ids = [
            output_ids[
                0,
                inputs["input_ids"].shape[1]:
            ]
        ]

        result = self.processor.batch_decode(
            generated_ids,
            skip_special_tokens=True
        )[0]

        return result.strip()
    
    ####################################################################
    # Process Single Frame
    ####################################################################

    def process_frame(
        self,
        image_path
    ):

        print(
            f"\nProcessing: {os.path.basename(image_path)}"
        )

        print("Running OCR...")

        ocr_text = self.extract_text(
            image_path
        )

        print("OCR Complete")

        print("Classifying Content...")

        content_type = self.classify_content(
            ocr_text
        )

        print("Running Vision Model...")

        ai_analysis = self.analyze_image(
            image_path
        )

        print("Vision Analysis Complete")

        return {

            "image": image_path,

            "content_type": content_type,

            "ocr_text": ocr_text,

            "analysis": ai_analysis

        }

    ####################################################################
    # Batch Processing
    ####################################################################

    def process_frames(
        self,
        frame_folder
    ):

        results = []

        files = sorted(
            os.listdir(frame_folder)
        )

        image_files = [

            file

            for file in files

            if file.lower().endswith(
                (
                    ".jpg",
                    ".jpeg",
                    ".png"
                )
            )

        ]

        print(
            f"\nFound {len(image_files)} frames.\n"
        )

        for idx, file in enumerate(
            image_files,
            start=1
        ):

            print(
                f"[{idx}/{len(image_files)}]"
            )

            path = os.path.join(
                frame_folder,
                file
            )

            result = self.process_frame(
                path
            )

            results.append(
                result
            )

        return results

    ####################################################################
    # Save Vision Results
    ####################################################################

    def save_results(
        self,
        results,
        output_file
    ):

        os.makedirs(
            os.path.dirname(output_file),
            exist_ok=True
        )

        with open(
            output_file,
            "w",
            encoding="utf-8"
        ) as f:

            json.dump(

                results,

                f,

                indent=4,

                ensure_ascii=False

            )

        print(
            f"\nResults Saved -> {output_file}"
        )

    ####################################################################
    # Free Memory
    ####################################################################

    def unload(self):

        print(
            "\nUnloading Vision Models..."
        )

        try:

            del self.model

        except:

            pass

        try:

            del self.processor

        except:

            pass

        try:

            del self.ocr

        except:

            pass

        gc.collect()

        if torch.cuda.is_available():

            torch.cuda.empty_cache()

        print(
            "Vision Memory Released."
        )

if __name__ == "__main__":

    FRAME_FOLDER = (
        "outputs/frames/sample_lecture"
    )

    OUTPUT_FILE = (
        "outputs/vision/vision_results.json"
    )

    analyzer = VisionAnalyzer()

    results = analyzer.process_frames(
        FRAME_FOLDER
    )

    analyzer.save_results(
        results,
        OUTPUT_FILE
    )

    analyzer.unload()

    print(
        f"\nProcessed {len(results)} frames."
    )